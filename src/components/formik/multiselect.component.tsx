import React from "react";
import { useField } from "formik";
import { IndexPath, Select, SelectProps } from "@ui-kitten/components";

import { generateIndexPathArray } from "@utils/select.util";
import I18n from "i18n-js";

const getSelectedValues = (values: unknown[], indexPaths: IndexPath[]) => {
  return indexPaths.map((indexPath) => values[indexPath.row]);
};

const getValuesToDisplay = (values: string[], translationPrefix?: string) => {
  const transformedValues = translationPrefix
    ? values.map((value) => I18n.t(`${translationPrefix}${value}`))
    : values;

  return transformedValues.join(", ");
};

const FormikMultiselect = ({
  name,
  values,
  allSelected = false,
  children,
  valueTranslationPrefix,
  ...selectProps
}: SelectProps & {
  name: string;
  values: string[];
  valueTranslationPrefix?: string;
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
      value={getValuesToDisplay(field.value, valueTranslationPrefix)}
      status={meta.error ? "danger" : "primary"}
    >
      {children}
    </Select>
  );
};

export default FormikMultiselect;
