import { Autocomplete, type AutocompleteProps } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  parentOnChange: (value: string) => void;
} & AutocompleteProps<string, false, false, true>;
export function WrappedAutocomplete(props: Props) {
  const { parentOnChange, ...rest } = props;

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => {
    setValue(newValue || "");
  };

  const handleBlur = () => {
    if (value !== props.value) parentOnChange(value);
  };

  return (
    <Autocomplete
      {...rest}
      freeSolo
      value={value}
      fullWidth
      onBlur={handleBlur}
      onInputChange={handleChange}
    />
  );
}
