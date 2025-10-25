import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../views/Layout";
import ConnectionsView from "../views/ConnectionsView";
import TripsView from "../views/TripsView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/connections" replace />} />
          <Route path="/connections" element={<ConnectionsView />} />
          <Route path="/trips" element={<TripsView />} />
        </Route>

        {/* Routes underneath do not follow our general layout */}
      </Routes>
    </BrowserRouter>
  );
}

