import React, { useEffect, useRef } from 'react';

// Store
import useModelingStore from '../../../stores/modelingStore';

// Components
import DisplaySubHeader from '../../../components/Display/DisplaySubHeader';
import DisplaySectionLabel from '../../../components/Display/DisplaySectionLabel';
import InputCircularSlider from '../../../components/Inputs/InputCircularSlider';
import InputSlider from '../../../components/Inputs/InputSlider';
import InputCheckbox from '../../../components/Inputs/InputCheckbox';
import Button from '@mui/material/Button';

const resetBtnSx = {
  fontSize: '0.75rem',
  textTransform: 'none',
  fontWeight: 'bold'
};

const ModelingTab = () => {
  const {
    modelYRotation,
    setModelYRotation,
    modelXRotation,
    setModelXRotation,
    modelZRotation,
    setModelZRotation,
    yAutoRotationSpeed,
    setYAutoRotationSpeed,
    xAutoRotationSpeed,
    setXAutoRotationSpeed,
    zAutoRotationSpeed,
    setZAutoRotationSpeed,
    cameraPosition,
    cameraLookAt,
    setCameraPosition,
    setCameraLookAt
  } = useModelingStore();

  // Local state for enabling/disabling auto rotation
  const [xAutoEnabled, setXAutoEnabled] = React.useState(xAutoRotationSpeed !== 0);
  const [yAutoEnabled, setYAutoEnabled] = React.useState(yAutoRotationSpeed !== 0);
  const [zAutoEnabled, setZAutoEnabled] = React.useState(zAutoRotationSpeed !== 0);

  // Handlers for toggling auto rotation
  const handleXAutoToggle = (checked) => {
    setXAutoEnabled(checked);
    if (!checked) setXAutoRotationSpeed(0);
  };
  const handleYAutoToggle = (checked) => {
    setYAutoEnabled(checked);
    if (!checked) setYAutoRotationSpeed(0);
  };
  const handleZAutoToggle = (checked) => {
    setZAutoEnabled(checked);
    if (!checked) setZAutoRotationSpeed(0);
  };

  return (
    <div>
      <DisplaySubHeader text="Head Model" />
      <DisplaySectionLabel title="Rotation" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 pt-2">
        <InputCircularSlider
          label="X Axis"
          value={modelXRotation}
          onChange={setModelXRotation}
          color="var(--color-primary)"
          bgColor="var(--color-primary-200)"
        />
        <InputCircularSlider
          label="Y Axis"
          value={modelYRotation}
          onChange={setModelYRotation}
          color="var(--color-primary)"
          bgColor="var(--color-primary-200)"
        />
        <InputCircularSlider
          label="Z Axis"
          value={modelZRotation}
          onChange={setModelZRotation}
          color="var(--color-primary)"
          bgColor="var(--color-primary-200)"
        />
      </div>

      <DisplaySectionLabel title="Auto Rotation [X-Axis]" className="mt-4" />
      <InputCheckbox
        checked={xAutoEnabled}
        onChange={handleXAutoToggle}
        label="Enable Auto Rotation"
        className="mt-2"
      />
      {xAutoEnabled && (
        <InputSlider
          min={-4}
          max={4}
          step={0.1}
          value={xAutoRotationSpeed}
          onChange={setXAutoRotationSpeed}
          className="mt-2"
        />
      )}

      <DisplaySectionLabel title="Auto Rotation [Y-Axis]" className="mt-4" />
      <InputCheckbox
        checked={yAutoEnabled}
        onChange={handleYAutoToggle}
        label="Enable Auto Rotation"
        className="mt-2"
      />
      {yAutoEnabled && (
        <InputSlider
          min={-4}
          max={4}
          step={0.1}
          value={yAutoRotationSpeed}
          onChange={setYAutoRotationSpeed}
          className="mt-2"
        />
      )}

      <DisplaySectionLabel title="Auto Rotation [z-Axis]" className="mt-4" />
      <InputCheckbox
        checked={zAutoEnabled}
        onChange={handleZAutoToggle}
        label="Enable Auto Rotation"
        className="mt-2"
      />
      {zAutoEnabled && (
        <InputSlider
          min={-4}
          max={4}
          step={0.1}
          value={zAutoRotationSpeed}
          onChange={setZAutoRotationSpeed}
          className="mt-2"
        />
      )}

      <DisplaySubHeader text="Camera" className='mt-4' />
      <DisplaySectionLabel title="Position" />
      <div className="flex items-center justify-between">
        [{cameraPosition.join(', ')}]
        <Button
          size="small"
          variant="contained"
          sx={resetBtnSx}
          onClick={() => setCameraPosition([15, 15, 150])}
          disabled
        >
          Refresh to Reset
        </Button>
      </div>

      <DisplaySectionLabel title="Look At" className="mt-4" />
      <div className="flex items-center justify-between">
        [{cameraLookAt.join(', ')}]
        <Button
          size="small"
          variant="contained"
          sx={resetBtnSx}
          onClick={() => setCameraLookAt([0, 15, 0])}
        >
          Reset
        </Button>
      </div>

    </div>
  );
};

export default ModelingTab;
