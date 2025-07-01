import React from 'react';

import Select from 'react-select';

const OptionLabel = ({ option, context }) => {
  return (
    <div className="flex items-center w-full">
      <span className="flex-1 text-left">{option.label}</span>
      <img
        src={option.image}
        alt={option.label}
        className={`object-cover rounded-full ml-2 justify-self-end ${context === 'menu' ? 'w-16 h-16' : 'w-8 h-8'}`}
      />
    </div>
  );
};

const InputInputImageSelection = ({ options, value, onChange }) => {
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
          const bgColor = isSelected ? 'var(--primary-50)' : state.isFocused ? 'var(--primary-50)' : provided.backgroundColor;
          return {
            ...provided,
            backgroundColor: bgColor,
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          };
        },
        singleValue: (provided) => ({
          ...provided,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'transparent',
          color: '#000',
        }),
      }}
      formatOptionLabel={(option, { context }) => <OptionLabel option={option} context={context} />}
      getOptionValue={option => option.value}
      isSearchable={true}
      className="cursor-pointer"
    />
  );
};

export default InputInputImageSelection;
