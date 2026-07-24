import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faProjectDiagram,
  faUserCircle,
  faBriefcase,
  faCertificate,
  faCog,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

const Profile = ({
  picture,
  first_name,
  last_name,
  email,
  emailVerified,
  logOut,
  setOpenSnackBar,
}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const userId = email.split("@")[0];

  const menuItems = [
    {
      menu_name: "Edit User",
      routeName: `/${userId}/about/details/edit`,
      icon: faUserCircle,
    },
    {
      menu_name: "Edit Project",
      routeName: `/${userId}/projects/edit`,
      icon: faProjectDiagram,
    },
    {
      menu_name: "Edit Certificate",
      routeName: `/${userId}/certificatation/edit`,
      icon: faCertificate,
    },
    {
      menu_name: "Edit Skill",
      routeName: `/${userId}/about/skill/edit`,
      icon: faCog,
    },
    {
      menu_name: "Edit Education",
      routeName: `/${userId}/about/education/edit`,
      icon: faGraduationCap,
    },
    {
      menu_name: "Edit Work",
      routeName: `/${userId}/workexperience/edit`,
      icon: faBriefcase,
    },
  ];

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogOut = () => logOut();

  const goToEditPage = (routeName) => {
    if (emailVerified) {
      navigate(routeName);
      handleCloseUserMenu();
    } else {
      setOpenSnackBar(true, "You do not have permission to edit!");
    }
  };

  return (
    <Box>
      <Tooltip title="Profile Menu">
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar
            alt={`${first_name} ${last_name}`}
            src={picture}
            sx={{
              bgcolor: "var(--primary-color)",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            {first_name[0]}
            {last_name[0]}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        PaperProps={{
          elevation: 6,
          sx: {
            mt: 1.5,
            borderRadius: "12px",
            minWidth: 240,
            padding: "0.5rem 0",
            background: "#fff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Profile header */}
        <MenuItem
          disableRipple
          sx={{ "&:hover": { background: "transparent" } }}
          onClick={() => goToEditPage(`/${email}/about`)}
        >
          <Avatar alt="Profile Picture" src={picture} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Hi {first_name}!
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {email}
            </Typography>
          </Box>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        {/* Dynamic edit items */}
        {menuItems.map((each) => (
          <MenuItem
            key={each.routeName}
            onClick={() => goToEditPage(each.routeName)}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={each.icon} fontSize={16} color="#555" />
            </ListItemIcon>
            <Typography variant="body2" sx={{ color: "#444" }}>
              {each.menu_name}
            </Typography>
          </MenuItem>
        ))}

        <Divider sx={{ my: 1 }} />

        {/* Logout */}
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "#d32f2f" }} />
          </ListItemIcon>
          <Typography
            variant="body2"
            sx={{ color: "#d32f2f", fontWeight: 500 }}
          >
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
