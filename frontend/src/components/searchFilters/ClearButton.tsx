import { IconButton } from "@mui/material";

import { Clear } from "@mui/icons-material";

type Props = {
    onClick?: () => void;
}
export function ClearButton(props: Props) {
  return (
    <IconButton onClick={props.onClick}>
      <Clear />
    </IconButton>
  );
}
