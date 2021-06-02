import styled from "styled-components";

const Wrapper = styled("div")`
  position: relative;
`;

const Label = styled("label")`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 24px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    transition: 0.2s;
  }
`;

const CheckBox = styled("input")`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;

  &:checked + ${Label} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const CustomToogle = (props) => {
  const { value = false, onChange, disabled = false } = props;

  const handleOnChange = (checked) => {
    onChange && onChange(checked);
  };

  return (
    <Wrapper>
      <CheckBox
        id="checkbox"
        type="checkbox"
        checked={value}
        disabled={disabled}
        onChange={(e) => {
          handleOnChange(e.target.checked);
        }}
      />
      <Label htmlFor="checkbox" />
    </Wrapper>
  );
};

export default CustomToogle;
