import Select from "react-select";

const CustomSelect = (props) => {
  const { options = [], onChange, disabled = false, placeholder = "" } = props;

  const handleChange = (selected) => {
    onChange && onChange(selected.value);
  };

  return (
    <Select
      isDisabled={disabled}
      options={options}
      onChange={handleChange}
      placeholder={placeholder ? placeholder : "Pilih..."}
    />
  );
};

export default CustomSelect;
