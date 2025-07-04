import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption, CheckboxControl,
} from "@wordpress/components";

const N360BlocksRadioGroup = ({ label, options, selected, updateOption, name }) => {

  const handleChange = (value) => {
    const updatedState = name
      ? { [name]: value }
      : value;
    updateOption(updatedState)
  };

  return (
    <>
      <ToggleGroupControl
        label={label}
        value={selected}
        isBlock
        onChange={handleChange}
      >
        {Object.entries(options).map(([key, value]) => (
          <ToggleGroupControlOption
            value={key}
            label={value}
            key={key}
          />
        ))}
      </ToggleGroupControl>
    </>
  );
}

export default N360BlocksRadioGroup
