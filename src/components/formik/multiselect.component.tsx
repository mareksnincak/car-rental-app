import React from "react";
import { useField } from "formik";

import { IndexPath, Select, SelectProps } from "@ui-kitten/components";
import { generateIndexPathArray } from "@utils/select.util";

const getSelectedValues = (values: unknown[], indexPaths: IndexPath[]) => {
  return indexPaths.map((indexPath) => values[indexPath.row]);
};

const FormikMultiselect = ({
  name,
  values,
  allSelected = false,
  children,
  ...selectProps
}: SelectProps & {
  name: string;
  values: string[];
  allSelected?: boolean;
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedIndex, setSelectedIndex] = React.useState(
    allSelected
      ? generateIndexPathArray(values.length)
      : selectProps.selectedIndex
  );

  return (
    <Select
      {...selectProps}
      multiSelect={true}
      selectedIndex={selectedIndex}
      onSelect={(_index) => {
        const index = _index as IndexPath[];
        const selectedValues = getSelectedValues(values, index);

        setSelectedIndex(index);
        helpers.setValue(selectedValues);
      }}
      value={field.value.join(", ")}
      status={meta.error ? "danger" : "primary"}
    >
      {children}
    </Select>
  );
};

export default FormikMultiselect;
