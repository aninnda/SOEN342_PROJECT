import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@/styles/App.css"
import Router from "./router/Router"

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Router />
      </QueryClientProvider>
    </>
  )
}

export default App
