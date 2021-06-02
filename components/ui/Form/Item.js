import { darken } from "polished";
import { createContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const FormItemContext = createContext();

const FormLabel = styled("label")`
  font-size: 12px;
  margin-bottom: 4px;
  color: ${({ theme }) => darken(0.6, theme.colors.muted)};
`;

const ErrorText = styled(motion.div)`
  margin-top: 2px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

const Item = (props) => {
  const { label, error } = props;

  return (
    <FormItemContext.Provider value={{ error }}>
      <div className="mb-2">
        <FormLabel>{label}</FormLabel>
        <div>{props.children}</div>
        {error && (
          <ErrorText
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </ErrorText>
        )}
      </div>
    </FormItemContext.Provider>
  );
};

export default Item;
