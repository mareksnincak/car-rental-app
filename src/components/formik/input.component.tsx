import React from "react";
import { useField } from "formik";

import { Input, InputProps } from "@ui-kitten/components";

const FormikInput = ({
  name,
  ...inputProps
}: InputProps & { name: string }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Input
      {...inputProps}
      value={field.value}
      onChangeText={(text) => helpers.setValue(text)}
      status={meta.error ? "danger" : "primary"}
    />
  );
};

export default FormikInput;
