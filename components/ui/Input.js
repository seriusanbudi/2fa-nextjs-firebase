import { useContext } from "react";
import styled from "styled-components";
import { FormItemContext } from "components/ui/Form/Item";

const StyledInput = styled("input")`
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 12px;
  border: solid 2px ${({ theme }) => theme.colors.muted};
  border-radius: 6px;
  transition: 0.2s;
  font-size: 14px;

  ${({ error, theme }) =>
    error &&
    `
      border: solid 2px ${theme.colors.danger};
  `}

  :focus {
    outline: none;
    border: solid 2px ${({ theme }) => theme.colors.primary};
  }
`;

const Input = (props) => {
  const { error: propsError, ...rest } = props;

  const itemContext = useContext(FormItemContext);
  let ctxError = undefined;

  if (itemContext) ctxError = itemContext.error;

  let isError = propsError || ctxError;

  return <StyledInput error={isError} {...rest} />;
};

export default Input;
