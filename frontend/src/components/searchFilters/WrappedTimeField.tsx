import type { TimeFieldProps } from "@mui/x-date-pickers";
import { TimeField } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

type Props = {
  parentOnChange: (value: Dayjs | null) => void;
} & TimeFieldProps;

/**
 * Performance optimization by storing state within the component
 * and only updating the parent's state on blur.
 *
 * Used in SearchInterface for departureTime and arrivalTime filters.
 */
export default function WrappedTimeField(props: Props) {
  const [value, setValue] = useState<Dayjs | null>(props.value ?? null);

  const { parentOnChange, ...rest } = props;

  useEffect(() => {
    setValue(rest.value ?? null);
  }, [rest.value]);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handleBlur = () => {
    if (value) parentOnChange(value);
  };


  return (
    <TimeField
      {...rest}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      clearable
    />
  );
}
