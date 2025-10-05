import { Outlet } from "react-router";

/**
 * Layout component that provides a consistent structure for all pages.
 * TODO: implement the layout (header, footer, sidebar, etc.)
 * @returns The layout component that wraps around routed content.
 */
export default function Layout() {
  return (
    <div>
      <div id="main-area">
        <Outlet /> {/* This is where the routed content will go */}
      </div>
    </div>
  );
}
