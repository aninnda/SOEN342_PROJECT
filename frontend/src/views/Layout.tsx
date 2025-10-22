import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TrainIcon from "@mui/icons-material/Train";

/**
 * Layout component that provides a consistent structure for all pages.
 * TODO: implement the layout (header, footer, sidebar, etc.)
 * @returns The layout component that wraps around routed content.
 */
export default function Layout() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <div style={{ height: "100vh", width: "100vw", overflowX: "hidden" }}>
      <div id="main-area">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Train Connections App
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <List sx={{ width: 250 }}>
            <ListItemButton
              onClick={() => {
                navigate("/connections", { replace: true });
              }}
            >
              <ListItemIcon>
                <TrainIcon />
              </ListItemIcon>
              <ListItemText primary="Connections" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/trips", { replace: true });
              }}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary="Trips" />
            </ListItemButton>
          </List>
        </Drawer>
        <Outlet /> {/* This is where the routed content will go */}
      </div>
    </div>
  );
}
