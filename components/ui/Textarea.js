import styled from "styled-components";

const StyledTextarea = styled("textarea")`
  width: 100%;
  padding: 12px;
  border: solid 2px ${({ theme }) => theme.colors.muted};
  border-radius: 6px;
  transition: 0.2s;
  font-size: 14px;

  :focus {
    outline: none;
    border: solid 2px ${({ theme }) => theme.colors.primary};
  }
`;

const Textarea = (props) => {
  const { value, onChange, rows = "5" } = props;

  const handleOnChange = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <StyledTextarea rows={rows} onChange={handleOnChange}>
      {value}
    </StyledTextarea>
  );
};

export default Textarea;
