import { darken } from "polished";
import styled from "styled-components";

const StyeldButton = styled("button")`
  height: 40px;
  min-width: 40px;
  padding: 0px 14px;
  border-radius: 6px;
  border: solid 2px transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: 0.2s;

  ${({ block }) =>
    block &&
    `
    width: 100%;
  `}

  ${({ variant, color, theme }) => {
    switch (variant) {
      case "primary":
        return `
          background: ${theme.colors[color]};
          border-color: ${theme.colors[color]};
          color: #fff;
        `;
      case "link":
        return `
          background: transparent;
          border-color: transparent;
        `;

      default:
        return `
          background: transparent;
          border-color: ${theme.colors.muted};
        `;
    }
  }}

  :focus {
    outline: none;
  }

  :disabled {
    background: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => darken(0.4, theme.colors.muted)};
    border-color: ${({ theme }) => theme.colors.muted};
  }
`;

const Button = (props) => {
  const {
    variant,
    block = false,
    type = "button",
    loading = false,
    disabled = false,
    color = "primary",
    ...rest
  } = props;

  const isDisabled = loading || disabled;

  return (
    <StyeldButton
      disabled={isDisabled}
      variant={variant}
      block={block}
      type={type}
      color={color}
      {...rest}
    >
      {!loading && props.children}
      {loading && "Loading..."}
    </StyeldButton>
  );
};

export default Button;
