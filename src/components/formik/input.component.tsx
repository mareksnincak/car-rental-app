import React from "react";
import { useField } from "formik";
import { Input, InputProps } from "@ui-kitten/components";
import { useTheme } from "@react-navigation/native";

const FormikInput = ({
  name,
  ...inputProps
}: InputProps & { name: string }) => {
  const [field, meta, helpers] = useField(name);
  const theme = useTheme();

  return (
    <Input
      {...inputProps}
      value={field.value}
      onChangeText={(text) => helpers.setValue(text)}
      status={meta.error ? "danger" : "primary"}
      selectionColor={theme.colors.primary}
    />
  );
};

export default FormikInput;
