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
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // this keydown handler makes it so that when you press enter, it runs handleBlur which updates the parent's state
          // but also, it selects the currently highlighted option in the autocomplete list if there is one.
          const autocomplete = e.target as HTMLElement;
          const highlighted = document.querySelector(
            ".MuiAutocomplete-option.Mui-focused"
          );
          if (highlighted) {
            highlighted.dispatchEvent(
              new MouseEvent("click", { bubbles: true })
            );
          }
          setTimeout(() => {
            autocomplete.blur();
          });
        }
      }}
    />
  );
}
