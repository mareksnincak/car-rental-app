import React from "react";
import { useField } from "formik";
import { IndexPath, Select, SelectProps } from "@ui-kitten/components";

const FormikSelect = ({
  name,
  values,
  allSelected = false,
  children,
  ...selectProps
}: SelectProps & {
  name: string;
  values: (string | number)[];
  allSelected?: boolean;
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <Select
      {...selectProps}
      multiSelect={false}
      selectedIndex={selectedIndex}
      onSelect={(_index) => {
        const index = _index as IndexPath;
        const selectedValue = values[index.row];

        setSelectedIndex(index);
        helpers.setValue(selectedValue);
      }}
      value={field.value}
      status={meta.error ? "danger" : "primary"}
    >
      {children}
    </Select>
  );
};

export default FormikSelect;
