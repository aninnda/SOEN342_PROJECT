import { TextField, type TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  parentOnChange: (value: number) => void;
  value: number;
} & TextFieldProps;
export function WrappedNumberInput(props: Props) {
  const { parentOnChange, value: filterValue, ...rest } = props;

  const [value, setValue] = useState<number>(filterValue);

  useEffect(() => {
    setValue(filterValue);
  }, [filterValue]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    const parsedValue = Number(newValue);
    if (!isNaN(parsedValue)) {
      setValue(parsedValue);
    }
  };

  const handleBlur = () => {
    if (value && value !== filterValue) parentOnChange(value);
  };

  return (
    <TextField
      {...rest}
      fullWidth
      value={value}
      type="number"
      onBlur={handleBlur}
      label={rest.label}
      onChange={handleChange}
    />
  );
}
