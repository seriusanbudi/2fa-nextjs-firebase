import styled from "styled-components";

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
  border-bottom: solid 2px ${({ theme }) => theme.colors.muted};
`;

const Item = styled("button")`
  height: 40px;
  min-width: 40px;
  padding: 0px 14px;
  background: #fff;
  border: solid 1px ${({ theme }) => theme.colors.primary};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  border-bottom: solid 0px transparent;

  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.colors.primary};
    color: #fff;
  `}

  :focus {
    outline: none;
  }
`;

const Tab = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

Tab.Item = Item;

export default Tab;
