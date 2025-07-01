import gradientParser from 'gradient-parser';
import HairColorBlender from './HairColorBlender';
import chroma from 'chroma-js';

export class GradientColorService {
  // Public wrapper
  static blendHairColors(hairColor, artificialColors, bleachedHair = false) {
    const parsedArtificialColors = this.#parseGradient(artificialColors);
    return this.#applyHairColorToGradient(hairColor, parsedArtificialColors, bleachedHair);
  }

  // Private helpers
  static #normalizeToHex(colorStr) {
    try {
      return chroma(colorStr).hex();
    } catch {
      return '#000000';
    }
  }

  static #parseGradient(gradientStr) {
    const singleColorRegex = /^(#([0-9a-fA-F]{3,8})|rgba?\([^)]+\)|[a-zA-Z]+)$/;
    if (singleColorRegex.test(gradientStr.trim())) {
      const hexColor = this.#normalizeToHex(gradientStr.trim());
      return {
        isLinear: true,
        orientationAngle: 0,
        colors: [
          { color: hexColor, stop: 0 },
          { color: hexColor, stop: 100 }
        ]
      };
    }
    const parsed = gradientParser.parse(gradientStr);
    if (!parsed || !parsed.length) {
      // Return a fallback black color to prevent white screen
      return {
        isLinear: true,
        orientationAngle: 0,
        colors: [
          { color: '#000000', stop: 0 },
          { color: '#000000', stop: 100 }
        ]
      };
    }
    const gradient = parsed[0];
    const isLinear = gradient.type === 'linear-gradient';
    let orientationAngle = 180;
    if (isLinear && gradient.orientation) {
      if (gradient.orientation.type === 'angular') {
        orientationAngle = parseFloat(gradient.orientation.value);
      } else if (gradient.orientation.type === 'directional') {
        const dir = gradient.orientation.value;
        const dirMap = {
          'top': 0,
          'right': 90,
          'bottom': 180,
          'left': 270,
          'top right': 45,
          'right top': 45,
          'top left': 315,
          'left top': 315,
          'bottom right': 135,
          'right bottom': 135,
          'bottom left': 225,
          'left bottom': 225,
        };
        orientationAngle = dirMap[dir] !== undefined ? dirMap[dir] : 180;
      }
    }
    const colors = gradient.colorStops.map(stop => {
      let colorStr;
      if (stop.type === 'hex') {
        colorStr = '#' + stop.value;
      } else if (stop.type === 'rgb' || stop.type === 'rgba') {
        // Reconstruct rgb/rgba string
        const vals = stop.value;
        if (stop.type === 'rgb') {
          colorStr = `rgb(${vals.join(',')})`;
        } else {
          // rgba
          colorStr = `rgba(${vals.join(',')})`;
        }
      } else {
        colorStr = stop.value;
      }
      return {
        color: this.#normalizeToHex(colorStr),
        stop: stop.length?.value || 0
      };
    });

    if (colors.length > 0) {
      // Ensure stop at 0
      if (!colors.some(c => c.stop == 0)) {   // No need to check for strict equality, as stop is a string
        const minStop = Math.min(...colors.map(c => c.stop));
        const minColor = colors.find(c => c.stop === minStop)?.color || colors[0].color;
        colors.unshift({ color: minColor, stop: '0' });
      }
      // Ensure stop at 100
      if (!colors.some(c => c.stop == 100)) {
        const maxStop = Math.max(...colors.map(c => c.stop));
        const maxColor = colors.find(c => c.stop === maxStop)?.color || colors[colors.length - 1].color;
        colors.push({ color: maxColor, stop: '100' });
      }
    }
    return { isLinear, orientationAngle, colors };
  }

  static #parseColorToHSL(colorStr) {
    const [h, s, l] = chroma(colorStr).hsl();
    return {
      h: ((h ?? 0) * Math.PI) / 180,
      s: s ?? 0,
      l: l ?? 0
    };
  }

  static #calcBrightness(hsl) {
    const hDeg = (hsl.h * 180) / Math.PI;
    const [r, g, b] = chroma.hsl(hDeg, hsl.s, hsl.l).rgb();
    return 0.299 * (r / 255) + 0.587 * (g / 255) + 0.114 * (b / 255);
  }

  static #applyHairColorToGradient(naturalHex, gradientRes, bleached = false) {
    const naturalHSL = this.#parseColorToHSL(naturalHex);
    const blender = new HairColorBlender();
    const newColors = gradientRes.colors.map(colorObj => {
      try {
        const artificialHSL = this.#parseColorToHSL(colorObj.color);
        if (bleached) {
          // Convert HSL to hex for Three.js
          const hex = chroma.hsl((artificialHSL.h * 180) / Math.PI, artificialHSL.s, artificialHSL.l).hex();
          return {
            color: hex,
            stop: colorObj.stop
          };
        }
        const brightness = this.#calcBrightness(naturalHSL);
        const blendedHSL = blender.blend(naturalHSL, artificialHSL, brightness);
        // Convert blended HSL to hex for Three.js
        const hex = chroma.hsl((blendedHSL.h * 180) / Math.PI, blendedHSL.s, blendedHSL.l).hex();
        return {
          color: hex,
          stop: colorObj.stop
        };
      } catch (e) {
        return colorObj;
      }
    });
    return { ...gradientRes, colors: newColors };
  }
}