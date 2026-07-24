import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Footer from "../footer";
import Profile from "../profile/index.jsx";
import { base_url as serverAddress } from "../../api/api.js";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useSelector } from "react-redux";

import styles from "./index.module.css";

const Layout = ({ setOpenSnackBar }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, email } = useSelector((state) => ({
    user: state.userFromGoogle,
    email: state.userFromGoogle?.emails?.[0]?.value ?? state.userFromUrl,
  }));

  const userId = email?.split("@")?.[0];

  const routes = [
    { path: `/${userId}/about`, routeName: "About" },
    { path: `/${userId}/workexperience`, routeName: "Work" },
    { path: `/${userId}/certification`, routeName: "Certification" },
    { path: `/${userId}/projects`, routeName: "Project" },
    { path: `/${userId}/contacts`, routeName: "Contact" },
  ];

  const login = () => {
    window.open(`${serverAddress}/google`, "_self");
  };

  const logout = () => {
    window.open(`${serverAddress}/logout`, "_self");
  };

  return (
    <div className={styles.contentBackground}>
      <div className={styles.navContainer}>
        <nav className={styles.navbar}>
          <div className={styles.navContent}>
            {/* Desktop Nav */}
            <ul className={styles.navList}>
              {routes.map((eachRoute, index) => {
                const isActive = location.pathname.includes(eachRoute.path);
                return (
                  <li key={index} className={styles.navItem}>
                    <Link
                      to={eachRoute.path}
                      className={
                        isActive ? styles.navLinkActive : styles.navLink
                      }
                    >
                      {eachRoute.routeName}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right - Profile / Sign In OR Mobile menu */}
            <div className={styles.profileSection}>
              {/* Show Profile/Sign In only on desktop */}
              <div className={styles.desktopOnly}>
                {user ? (
                  <Profile
                    picture={user.photos[0]?.value}
                    first_name={user.name.givenName}
                    last_name={user.name.familyName}
                    email={user.emails[0]?.value}
                    emailVerified={user.emails[0]?.verified}
                    logOut={logout}
                    setOpenSnackBar={setOpenSnackBar}
                  />
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<GoogleIcon sx={{ fontSize: "22px" }} />}
                    onClick={login}
                    sx={{
                      textTransform: "none",
                      borderRadius: "999px",
                      padding: "6px 18px",
                      fontWeight: 500,
                      background: "var(--primary-color)",
                      "&:hover": { background: "var(--primary-color-dark)" },
                    }}
                  >
                    Sign in
                  </Button>
                )}
              </div>

              {/* Hamburger + Logo for mobile */}
              <div className={styles.mobileOnly}>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setMobileOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Drawer for mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <List sx={{ width: 220 }}>
          {routes.map((eachRoute, index) => (
            <ListItem key={index} onClick={() => setMobileOpen(false)}>
              <Link
                to={eachRoute.path}
                className={
                  eachRoute.path === location.pathname
                    ? styles.navLinkActive
                    : styles.navLink
                }
              >
                {eachRoute.routeName}
              </Link>
            </ListItem>
          ))}
          <ListItem>
            {user ? (
              <Profile
                picture={user.photos[0]?.value}
                first_name={user.name.givenName}
                last_name={user.name.familyName}
                email={user.emails[0]?.value}
                emailVerified={user.emails[0]?.verified}
                logOut={logout}
                setOpenSnackBar={setOpenSnackBar}
              />
            ) : (
              <Button
                variant="contained"
                startIcon={<GoogleIcon sx={{ fontSize: "22px" }} />}
                onClick={login}
                fullWidth
                sx={{
                  textTransform: "none",
                  borderRadius: "999px",
                  padding: "6px 18px",
                  fontWeight: 500,
                  background: "var(--primary-color)",
                  "&:hover": { background: "var(--primary-color-dark)" },
                }}
              >
                Sign in
              </Button>
            )}
          </ListItem>
        </List>
      </Drawer>

      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
