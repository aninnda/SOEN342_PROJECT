import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../views/Layout";
import IndexView from "../views/IndexView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexView />} />
        </Route>

        {/* Routes underneath do not follow our general layout */}
      </Routes>
    </BrowserRouter>
  );
}

