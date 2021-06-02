import Item from "./Item";

const Form = (props) => {
  return <form {...props}>{props.children}</form>;
};

Form.Item = Item;

export default Form;
