import React, { useEffect, useState } from 'react';

// Store
import useEnvironmentStore from '../../../stores/environmentStore';

// Enums
import Scene from '../../../enums/Scene';

// Components
import DisplaySectionLabel from '../../../components/Display/DisplaySectionLabel';
import DisplaySubHeader from '../../../components/Display/DisplaySubHeader';
import InputRadioGroup from '../../../components/Inputs/InputRadioGroup/';
import InputTimePicker from '../../../components/Inputs/InputTimePicker';
import InputDatePicker from '../../../components/Inputs/InputDatePicker';
import InputNumber from '../../../components/Inputs/InputNumber';
import InputRegularSelection from '../../../components/Inputs/InputRegularSelection';

const EnvironmentTab = () => {
  const {
    timestamp,
    setTimestamp,
    timeMode,
    setTimeMode,
    dateMode,
    setDateMode,
    latitude,
    setLatitude,
    latitudeMode,
    setLatitudeMode,
    longitude,
    setLongitude,
    longitudeMode,
    setLongitudeMode,
    scene,
    setScene
  } = useEnvironmentStore();

  const [currentTimeLabel, setCurrentTimeLabel] = useState(
    'Now ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const [myLatitude, setMyLatitude] = useState(NaN);
  const [myLongitude, setMyLongitude] = useState(NaN);

  // Calculate today before any conditional returns
  const todayDate = new Date();
  const today = todayDate.toISOString().slice(0, 10);
  const todayShort = todayDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });

  // If timeMode is now, update time part of timestamp automatically
  useEffect(() => {
    if (timeMode) {
      const updateTime = () => {
        const d = new Date(timestamp);
        const now = new Date();
        d.setHours(now.getHours());
        d.setMinutes(now.getMinutes());
        d.setSeconds(0);
        setTimestamp(d.getTime());
      };
      updateTime();
      const interval = setInterval(updateTime, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [timeMode, setTimestamp, timestamp]);

  // If dateMode is today, update date part of timestamp automatically
  useEffect(() => {
    if (dateMode) {
      const updateDate = () => {
        const d = new Date(timestamp);
        const now = new Date();
        d.setFullYear(now.getFullYear());
        d.setMonth(now.getMonth());
        d.setDate(now.getDate());
        setTimestamp(d.getTime());
      };
      updateDate();
    }
    // Only run on mount or when dateMode changes
    // eslint-disable-next-line
  }, [dateMode]);

  // Update the current time label every minute
  useEffect(() => {
    const updateLabel = () => {
      setCurrentTimeLabel(
        'Now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) + ')'
      );
    };
    updateLabel();
    const interval = setInterval(updateLabel, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Try to get current location when latitudeMode or longitudeMode is true
  useEffect(() => {
    if (latitudeMode || longitudeMode) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (latitudeMode) {
              setLatitude(pos.coords.latitude);
              setMyLatitude(pos.coords.latitude);
            }
            if (longitudeMode) {
              setLongitude(pos.coords.longitude);
              setMyLongitude(pos.coords.longitude);
            }
          },
          (err) => {
            if (latitudeMode) setLatitudeMode(false);
            if (longitudeMode) setLongitudeMode(false);
          }
        );
      } else {
        if (latitudeMode) setLatitudeMode(false);
        if (longitudeMode) setLongitudeMode(false);
      }
    }
  }, [latitudeMode, longitudeMode, setLatitude, setLatitudeMode, setLongitude, setLongitudeMode]);

  // Extract date and time from timestamp
  const dateObj = new Date(timestamp);
  const selectedDate = dateObj.toISOString().slice(0, 10);
  const selectedMinute = dateObj.getHours() * 60 + dateObj.getMinutes();

  // Handlers for manual date/time change
  const handleTimeChange = (minute) => {
    const d = new Date(timestamp);
    d.setHours(Math.floor(minute / 60));
    d.setMinutes(minute % 60);
    d.setSeconds(0);
    setTimestamp(d.getTime());
  };
  const handleDateChange = (dateStr) => {
    const d = new Date(timestamp);
    const [year, month, day] = dateStr.split('-').map(Number);
    d.setFullYear(year);
    d.setMonth(month - 1);
    d.setDate(day);
    setTimestamp(d.getTime());
  };

  return (
    <div>
      <DisplaySubHeader text="Scene" />
      <DisplaySectionLabel title="Scene" />
      <InputRegularSelection
        options={
          Object.entries(Scene).map(([key, value]) => ({
            value, label: value
          }))}
        value={scene}
        onChange={setScene}
      />

      {scene !== Scene.none && (
        <>

          <DisplaySubHeader text="Lighting Simulaton" className='mt-4' />
          <DisplaySectionLabel title="Time of Day" />
          <InputRadioGroup
            options={[
              { value: true, label: currentTimeLabel },
              { value: false, label: 'Specify' }
            ]}
            value={timeMode}
            onChange={val => setTimeMode(val === true || val === 'true')}
            label="Time of Day Mode"
            className="mt-2"
          />
          {!timeMode && (
            <div className="flex items-center gap-3 mt-4">
              <InputTimePicker
                value={selectedMinute}
                onChange={handleTimeChange}
                disabled={timeMode}
              />
            </div>
          )}

          <DisplaySectionLabel title="Date" className="mt-4" />
          <InputRadioGroup
            options={[
              { value: true, label: `Today (${todayShort})` },
              { value: false, label: 'Specify' }
            ]}
            value={dateMode}
            onChange={val => setDateMode(val === true || val === 'true')}
            label="Date Mode"
            className="mt-2"
          />
          {!dateMode && (
            <div className="flex items-center gap-3 mt-4">
              <InputDatePicker
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
          )}

          <DisplaySectionLabel title="Latitude" className="mt-4" />
          <InputRadioGroup
            options={[
              { value: true, label: 'My Location' },
              { value: false, label: 'Specify' }
            ]}
            value={latitudeMode}
            onChange={val => setLatitudeMode(val === true || val === 'true')}
            label="Latitude Mode"
            className="mt-2"
          />
          {latitudeMode ? (
            <div className="mt-4">
              Your latitude is: {myLatitude ? `${Math.abs(myLatitude).toFixed(1)}° ${myLatitude >= 0 ? 'N' : 'S'}` : 'Unknown'}
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-4 overflow-hidden">
              <InputNumber
                min={0}
                max={90}
                step={0.1}
                value={Math.abs(latitude).toFixed(1)}
                onChange={val => {
                  const absVal = Math.abs(parseFloat(val));
                  setLatitude(latitude >= 0 ? absVal : -absVal);
                }}
              />
              <InputRegularSelection
                options={[
                  { value: 'N', label: 'N' },
                  { value: 'S', label: 'S' }
                ]}
                value={latitude >= 0 ? 'N' : 'S'}
                onChange={val => {
                  if (val === 'N' && latitude < 0) setLatitude(-latitude);
                  if (val === 'S' && latitude > 0) setLatitude(-latitude);
                }}
              />
            </div>
          )}

          <DisplaySectionLabel title="Longitude" className="mt-4" />
          <InputRadioGroup
            options={[
              { value: true, label: 'My Location' },
              { value: false, label: 'Specify' }
            ]}
            value={longitudeMode}
            onChange={val => setLongitudeMode(val === true || val === 'true')}
            label="Longitude Mode"
            className="mt-2"
          />
          {longitudeMode ? (
            <div className="mt-4">
              Your longitude is: {myLongitude ? `${Math.abs(myLongitude).toFixed(1)}° ${myLongitude >= 0 ? 'E' : 'W'}` : 'Unknown'}
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-4 overflow-hidden">
              <InputNumber
                min={0}
                max={180}
                step={0.1}
                value={Math.abs(longitude).toFixed(1)}
                onChange={val => {
                  const absVal = Math.abs(parseFloat(val));
                  setLongitude(longitude >= 0 ? absVal : -absVal);
                }}
              />
              <InputRegularSelection
                options={[
                  { value: 'E', label: 'E' },
                  { value: 'W', label: 'W' }
                ]}
                value={longitude >= 0 ? 'E' : 'W'}
                onChange={val => {
                  if (val === 'E' && longitude < 0) setLongitude(-longitude);
                  if (val === 'W' && longitude > 0) setLongitude(-longitude);
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnvironmentTab;
