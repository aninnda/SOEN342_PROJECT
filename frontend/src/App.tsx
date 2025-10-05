import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/App.css";
import Router from "./router/Router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
          <Router />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
