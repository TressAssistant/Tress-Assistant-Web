import React from 'react';

import Select from 'react-select';

const OptionLabel = ({ option }) => (
  <div className="flex items-center gap-2">
    <span
      className="inline-block w-5 h-5 rounded-full border border-primary mr-2"
      style={{ background: option.value }}
    />
    <span>{option.label}</span>
  </div>
);

function isColorDark(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  if (c.length !== 6) return false;
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness < 128;
}

const InputColorSelection = ({ options, value, onChange }) => {
  const selectedOption = options.find(option => option.value === value);
  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={option => option && onChange(option.value)}
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderColor: state.isFocused ? 'var(--primary)' : '#ccc',
          boxShadow: state.isFocused ? '0 0 0 1px var(--primary)' : provided.boxShadow,
          '&:hover': {
            borderColor: state.isFocused ? 'var(--primary)' : '#ccc',
          },
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,
        }),
        option: (provided, state) => {
          const isSelected = state.isSelected;
          const bgColor = isSelected ? state.data.value : state.isFocused ? 'var(--primary-50)' : provided.backgroundColor;
          let textColor = '#000';
          if (isSelected && /^#([0-9A-F]{3}){1,2}$/i.test(state.data.value) && isColorDark(state.data.value)) {
            textColor = '#fff';
          }
          return {
            ...provided,
            backgroundColor: bgColor,
            color: textColor,
          };
        },
        singleValue: (provided, state) => ({
          ...provided,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'transparent',
          color: '#000',
        }),
      }}
      formatOptionLabel={option => <OptionLabel option={option} />}
      getOptionValue={option => option.value}
      isSearchable={false}
      classNamePrefix="tw-select"
    />
  );
};

export default InputColorSelection;
