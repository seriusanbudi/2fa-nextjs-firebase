import Button from "components/ui/Button";
import Form from "components/ui/Form";
import Input from "components/ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useState } from "react";
import { auth, db } from "utils/firebase";

const defaultValues = {
  email: "",
  password: "",
};

const formSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const SigninForm = (props) => {
  const { onSuccess } = props;
  const [submitting, setSubmitting] = useState(false);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const onCommitSignin = ({ email, password }) => {
    setSubmitting(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        onSuccess && onSuccess({ email, password }, userData);
      })
      .catch((err) => {
        setSubmitting(false);

        setError("email", {
          type: "manual",
          message: err.message,
        });
      });
  };

  return (
    <Form onSubmit={handleSubmit(onCommitSignin)}>
      <Form.Item label="Email" error={errors?.email?.message}>
        <Input
          placeholder="Email"
          onChange={(e) => {
            setValue("email", e.target.value, { shouldValidate: true });
          }}
        />
      </Form.Item>
      <Form.Item label="Password" error={errors?.password?.message}>
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setValue("password", e.target.value, { shouldValidate: true });
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button loading={submitting} type="submit" block variant="primary">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SigninForm;
