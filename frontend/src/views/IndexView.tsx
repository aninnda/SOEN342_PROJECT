import { Box, Typography } from "@mui/material";
import ConnectionTable from "../components/ConnectionTable";

/**
 *
 * TODO: Remove this temporary index page, and route based on login state.
 * @returns A temporary index page.
 */
export default function IndexView() {
  return (
    <Box>
      <Typography variant="h3" align="center" gutterBottom>
        Available Train Connections
      </Typography>
      <ConnectionTable />
    </Box>
  );
}
