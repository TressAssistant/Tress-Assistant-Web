import chroma from 'chroma-js';
import SunCalc from 'suncalc';

/**
 * Simulates environmental lighting conditions (sun position, intensity, and sun color)
 * for a given date/time at a specific latitude and longitude.
 *
 * @param {Date} date - The JS Date object representing the date and time.
 * @param {number} latitude - The latitude in degrees. 
 * @param {number} longitude - The longitude in degrees.
 * @returns {Object} An object containing:
 *   @property {string} time - The formatted time string ("HH:MM").
 *   @property {number} sunIntensity - The normalized sun intensity (0-1).
 *   @property {number} sunElevationAngle - The sun's elevation angle in degrees.
 *   @property {number[]} sunDirection - The sun's light direction as a 3D vector [x, y, z].
 *   @property {string} sunColor - The interpolated sun color as a hex string.
 *   @property {number} sunAzimuth - The sun's azimuth angle in degrees.
 */

const SUN_COLORS = {
  night: [0.0, 0.0, 0.0],
  nautical: [0.2, 0.2, 0.3],
  dawn: [1.0, 0.5, 0.0],
  golden: [1.0, 0.7, 0.2],
  day: [1.0, 1.0, 0.9],
};

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function toDegrees(rad) {
  return (rad * 180) / Math.PI;
}

function minutesToTime(mins) {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

function sunToLightDirection(elevation_deg, azimuth_deg) {
  const elevation_rad = toRadians(elevation_deg);
  const azimuth_rad = toRadians(azimuth_deg);
  const x = -Math.sin(azimuth_rad) * Math.cos(elevation_rad);
  const z = -Math.cos(azimuth_rad) * Math.cos(elevation_rad);
  const y = Math.sin(elevation_rad);
  return [x, y, z];
}

function interpolateColor(a, b, t) {
  return a.map((v, i) => v + (b[i] - v) * t);
}

function getPhase(minute, times) {
  // Convert Date objects to minutes since midnight
  const toMin = d => d ? d.getHours() * 60 + d.getMinutes() : null;
  const m = minute;
  const t = {
    nightEnd: toMin(times.nightEnd),
    nauticalDawn: toMin(times.nauticalDawn),
    dawn: toMin(times.dawn),
    sunrise: toMin(times.sunrise),
    goldenHourEnd: toMin(times.goldenHourEnd),
    solarNoon: toMin(times.solarNoon),
    goldenHour: toMin(times.goldenHour),
    sunset: toMin(times.sunset),
    dusk: toMin(times.dusk),
    nauticalDusk: toMin(times.nauticalDusk),
    night: toMin(times.night),
  };
  if (m < t.nightEnd || m >= t.night) return 'night';
  if (m < t.nauticalDawn) return 'night';
  if (m < t.dawn) return 'nautical';
  if (m < t.sunrise) return 'dawn';
  if (m < t.goldenHourEnd) return 'golden';
  if (m < t.goldenHour) return 'day';
  if (m < t.sunset) return 'golden';
  if (m < t.dusk) return 'dawn';
  if (m < t.nauticalDusk) return 'nautical';
  return 'night';
}

function interpolateSunIntensity(angle, daylight_minutes) {

  //console.log(angle, daylight_minutes);

  const zenith_angle = toRadians(90 - angle);
  const exponent = daylight_minutes / 60 + 1;
  const bias = Math.pow(Math.PI * 0.5, exponent) / Math.log(10);
  const intensity = Math.exp(-1 * Math.pow(zenith_angle, exponent) / bias);
  return Math.max(0, Math.min(1, intensity));
}

function LightingSimulator(date, latitude, longitude) {
  // date: JS Date object
  const minute = date.getHours() * 60 + date.getMinutes();
  const dateString = date.toISOString().slice(0, 10);
  const [year, month, day] = dateString.split('-').map(Number);
  const dateForSun = new Date(year, month - 1, day, date.getHours(), date.getMinutes());

  const times = SunCalc.getTimes(dateForSun, latitude, longitude);
  const pos = SunCalc.getPosition(dateForSun, latitude, longitude);
  const sun_elev = toDegrees(pos.altitude);
  const sun_az = toDegrees(pos.azimuth) + 180; // SunCalc azimuth is from south, CW
  const sun_dir = sunToLightDirection(sun_elev, sun_az);

  // Moon data
  const moonPos = SunCalc.getMoonPosition(dateForSun, latitude, longitude);
  const moonIllum = SunCalc.getMoonIllumination(dateForSun);
  const moon_elev = toDegrees(moonPos.altitude);
  const moon_az = toDegrees(moonPos.azimuth) + 180;
  const moon_dir = sunToLightDirection(moon_elev, moon_az);

  // Detect polar night or midnight sun
  const sunriseExists = times.sunrise instanceof Date && !isNaN(times.sunrise);
  const sunsetExists = times.sunset instanceof Date && !isNaN(times.sunset);
  let polarMode = null; // 'night', 'day', or null
  if (!sunriseExists && !sunsetExists) {
    // Check sun elevation at solar noon
    const noon = times.solarNoon instanceof Date ? times.solarNoon : dateForSun;
    const noonPos = SunCalc.getPosition(noon, latitude, longitude);
    const noonElev = toDegrees(noonPos.altitude);
    if (noonElev < 0) {
      polarMode = 'night'; // Polar night
    } else {
      polarMode = 'day'; // Midnight sun
    }
  }

  // This library cannot handle midnight sun and polar night correctly,
  // so we handle NaN values for sunrise/sunset
  const sunriseMin = sunriseExists ? times.sunrise.getHours() * 60 + times.sunrise.getMinutes() : 0;
  const sunsetMin = sunsetExists ? times.sunset.getHours() * 60 + times.sunset.getMinutes() : 1440;

  const daylight_minutes = Math.max(0, sunsetMin - sunriseMin);
  const sun_intensity = interpolateSunIntensity(sun_elev, daylight_minutes);

  // Color phase
  let phase, nextPhase, t;
  if (polarMode === 'night') {
    phase = 'night';
    nextPhase = null;
    t = 0;
  } else if (polarMode === 'day') {
    phase = 'day';
    nextPhase = null;
    t = 0;
  } else {
    phase = getPhase(minute, times);
    // Interpolate between phases for smooth color transitions
    if (phase === 'night') {
      nextPhase = 'nautical';
      t = 0;
      if (minute >= 0 && minute < 1440) {
        // Find transition to nautical
        const next = times.nightEnd ? times.nightEnd.getHours() * 60 + times.nightEnd.getMinutes() : 0;
        t = Math.min(1, Math.max(0, (minute - (next - 30)) / 30));
      }
    } else if (phase === 'nautical') {
      nextPhase = 'dawn';
      t = 0.5;
    } else if (phase === 'dawn') {
      nextPhase = 'golden';
      t = 0.5;
    } else if (phase === 'golden') {
      nextPhase = 'day';
      t = 0.5;
    } else if (phase === 'day') {
      nextPhase = 'golden';
      t = 0.5;
    }
  }
  const sunColorArr = nextPhase ? interpolateColor(SUN_COLORS[phase], SUN_COLORS[nextPhase], t) : SUN_COLORS[phase];

  return {
    time: minutesToTime(minute),
    sunIntensity: +sun_intensity.toFixed(2),
    sunElevationAngle: +sun_elev.toFixed(2),
    sunDirection: sun_dir.map((v) => +v.toFixed(2)),
    sunColor: chroma.rgb(sunColorArr.map(v => v * 255)).hex(),
    sunAzimuth: +sun_az.toFixed(2),
    // Moon data
    moonElevationAngle: +moon_elev.toFixed(2),
    moonAzimuth: +moon_az.toFixed(2),
    moonDirection: moon_dir.map((v) => +v.toFixed(2)),
    moonIllumination: +moonIllum.fraction.toFixed(3),
    moonPhase: +moonIllum.phase.toFixed(3),
  };
}

export default LightingSimulator;