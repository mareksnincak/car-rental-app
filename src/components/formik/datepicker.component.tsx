import React from "react";
import { useField } from "formik";
import { Datepicker, DatepickerProps } from "@ui-kitten/components";

const FormikDatepicker = ({
  name,
  ...datepickerProps
}: DatepickerProps & {
  name: string;
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Datepicker
      {...datepickerProps}
      date={field.value}
      onSelect={(date) => helpers.setValue(date)}
      status={meta.error ? "danger" : "primary"}
    />
  );
};

export default FormikDatepicker;
