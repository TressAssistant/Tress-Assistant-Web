import React from 'react';

// Components
import DisplaySectionLabel from '../../../components/Display/DisplaySectionLabel';
import DisplaySubHeader from '../../../components/Display/DisplaySubHeader';
import useRenderingStore from '../../../stores/renderingStore';
import InputCheckbox from '../../../components/Inputs/InputCheckbox';
import InputSlider from '../../../components/Inputs/InputSlider';

const RenderingTab = () => {

  const {
    showAxesHelper,
    setShowAxesHelper,
    showStats,
    setShowStats,
    fpsLimitEnabled,
    setFpsLimitEnabled,
    fpsLimit,
    setFpsLimit,
    showShadows,
    setShowShadows,
  } = useRenderingStore();

  return (
    <div>
      <DisplaySubHeader text="Performance" />

      <DisplaySectionLabel title="FPS Limiter" />
      <InputCheckbox
        checked={fpsLimitEnabled}
        onChange={setFpsLimitEnabled}
        label="Enable Limiter"
      />

      {fpsLimitEnabled && (
        <div className="mt-2">
          <InputSlider
            min={5}
            max={60}
            step={1}
            value={fpsLimit}
            onChange={setFpsLimit}
            disabled={!fpsLimitEnabled}
          />
        </div>
      )}

      <DisplaySectionLabel title="Shadows" description="This option does not take effect immediately. Refresh the page to apply changes." className="mt-4" />
      <InputCheckbox
        checked={showShadows}
        onChange={setShowShadows}
        label="Show Shadows"
      />

      <DisplaySubHeader text="Debugging" className="mt-4" />

      <DisplaySectionLabel title="Axes Helper" />
      <InputCheckbox
        checked={showAxesHelper}
        onChange={setShowAxesHelper}
        label="Show Axes Helper"
      />

      <DisplaySectionLabel title="Statistics" className="mt-4" />
      <InputCheckbox
        checked={showStats}
        onChange={setShowStats}
        label="Show Statistics"
      />


    </div>
  );
};

export default RenderingTab;
