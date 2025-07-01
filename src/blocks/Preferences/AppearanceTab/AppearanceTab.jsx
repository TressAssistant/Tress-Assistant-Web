import React from 'react';

// Enums and constants
import HumanSkinTone from '../../../enums/HumanSkinTone';
import Head from '../../../enums/Head';
import NaturalHairColor from '../../../enums/NaturalHairColor';
import HairStyle from '../../../enums/HairStyle';
import ColoringMode from '../../../enums/ColoringMode';

// Components
import DisplaySubHeader from '../../../components/Display/DisplaySubHeader';
import DisplaySectionLabel from '../../../components/Display/DisplaySectionLabel';
import InputRadioGroup from '../../../components/Inputs/InputRadioGroup/';
import InputColorSelection from '../../../components/Inputs/InputColorSelection';
import InputCheckbox from '../../../components/Inputs/InputCheckbox';
import InputRegularSelection from '../../../components/Inputs/InputRegularSelection';
//import InputColorPicker from '../../../components/Inputs/InputColorPicker';
import InputImageSelection from '../../../components/Inputs/InputImageSelection';
import InputGradientColorPicker from '../../../components/Inputs/InputGradientColorPicker';
import InputCircularSlider from '../../../components/Inputs/InputCircularSlider';

// Hooks and stores
import useAppearanceStore from '../../../stores/appearanceStore';

const skinToneOptions = Object.entries(HumanSkinTone).map(([name, color]) => ({
  value: color,
  label: name,
}));

const headOptions = Object.entries(Head).map(([name, value]) => ({
  value: value.id, // Use id as value
  label: name,
}));

const hairColorOptions = Object.entries(NaturalHairColor).map(([name, color]) => ({
  value: color,
  label: name,
}));

const hairStyleOptions = Object.entries(HairStyle).map(([name, value]) => ({
  value: value.id, // Use id as value
  label: value.name,
  image: value.thumbnail,
}));

const AppearanceTab = () => {
  const {
    skinTone,
    setSkinTone,
    headId,
    setHeadId,
    hairColor,
    setHairColor,
    hairStyleId,
    setHairStyleId,
    showHair,
    setShowHair,
    coloringMode,
    setColoringMode,
    bleachedHair,
    setBleachedHair,
    applyHairColor,
    setApplyHairColor,
    gradientColor,
    setGradientColor,
    gradientRotationX,
    setGradientRotationX,
    gradientRotationY,
    setGradientRotationY,
    gradientRotationZ,
    setGradientRotationZ,
  } = useAppearanceStore();

  const selectedSkinTone = skinToneOptions.find(option => option.value === skinTone);
  const selectedHairColor = hairColorOptions.find(option => option.value === hairColor);

  //console.log(gradientColor);

  return (
    <div>
      <DisplaySubHeader text="General" />
      <DisplaySectionLabel title="Facial Appearance" />
      <InputRadioGroup
        options={headOptions}
        value={headId}
        onChange={v => setHeadId(Number(v))}
        className="mt-2"
      />
      <DisplaySectionLabel title="Skin Tone" className="mt-4" />
      <InputColorSelection
        options={skinToneOptions}
        value={selectedSkinTone ? selectedSkinTone.value : ''}
        onChange={setSkinTone}
        className="mt-2"
      />
      <DisplaySectionLabel title="Show Hair" className="mt-4" />
      <InputCheckbox
        checked={showHair}
        onChange={setShowHair}
        label="Show Hair"
        className="mt-2"
      />

      {showHair && (
        <>
          <DisplaySectionLabel title="Natural Hair Color" className="mt-4" />
          <InputColorSelection
            options={hairColorOptions}
            value={selectedHairColor ? selectedHairColor.value : ''}
            onChange={setHairColor}
            className="mt-2"
          />
          <DisplaySectionLabel title="Hair Style" className="mt-4" />
          <InputImageSelection
            options={hairStyleOptions}
            value={hairStyleId}
            onChange={v => setHairStyleId(Number(v))}
            className="mt-2"
          />

          <DisplaySubHeader text="Hair Coloring" className='mt-4' />

          <DisplaySectionLabel title="Apply Hair Color" />
          <InputCheckbox
            checked={applyHairColor}
            onChange={setApplyHairColor}
            label="Apply Hair Color"
            className="mt-2"
          />

          {applyHairColor && (
            <>
              <DisplaySectionLabel title="Coloring Mode" className="mt-4" />

              <InputRegularSelection
                options={
                  Object.entries(ColoringMode).map(([key, value]) => ({
                    value,
                    label: value,
                  }))
                }
                value={coloringMode}
                onChange={setColoringMode}
              />

              <DisplaySectionLabel title="Bleaching" className="mt-4" />
              <InputCheckbox
                checked={bleachedHair}
                onChange={setBleachedHair}
                label="My Hair is Bleached"
                className="mt-2"
              />

              {coloringMode === ColoringMode.GradientColor && (
                <>
                  <DisplaySectionLabel title="Gradient Color" className="mt-4" />
                  <InputGradientColorPicker value={gradientColor} onChange={setGradientColor} />

                  <DisplaySectionLabel title="Gradient Rotation" className="mt-4" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 pt-2">
                    <InputCircularSlider
                      label="X Axis"
                      value={gradientRotationX}
                      onChange={setGradientRotationX}
                      color="var(--color-primary)"
                      bgColor="var(--color-primary-200)"
                    />
                    <InputCircularSlider
                      label="Y Axis"
                      value={gradientRotationY}
                      onChange={setGradientRotationY}
                      color="var(--color-primary)"
                      bgColor="var(--color-primary-200)"
                    />
                    <InputCircularSlider
                      label="Z Axis"
                      value={gradientRotationZ}
                      onChange={setGradientRotationZ}
                      color="var(--color-primary)"
                      bgColor="var(--color-primary-200)"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}

    </div>
  );
};

export default AppearanceTab;
