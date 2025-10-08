import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/App.css";
import Router from "./router/Router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={new QueryClient()}>
           <Router />
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
