import { alpha, makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import PageviewIcon from "@material-ui/icons/Pageview";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { useEffect } from "react";
import ForumIcon from "@material-ui/icons/Forum";
import clsx from "clsx";
import DescriptionIcon from "@material-ui/icons/Description";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MailIcon from "@material-ui/icons/Mail";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { message } from "antd";
import { setToken, setUser } from "../redux/features/authSlice";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    alignItems: "center",
    color: "white",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      color: "white",
    },
  },
  sectionMobile: {
    display: "flex",
    alignItems: "center",
    color: "white",
    [theme.breakpoints.up("md")]: {
      display: "none",
      color: "white",
    },
  },
}));

export default function Layout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [state, setState] = React.useState({
    left: false,
  });

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch(setUser(null));
    dispatch(setToken(""));
    navigate("/", { replace: true });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          height: "70px",
          alignItems: "center",
        }}
      >
        <IconButton style={{ cursor: "pointer", marginRight: "20px" }}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {user &&
          [1, 2].includes(user.role) &&
          [
            {
              text: "Dashboard",
              path: "/dashboard",
              icon: <DashboardIcon />,
            },
            {
              text: "Create Profile",
              path: "/create-profile",
              icon: <AccountCircleIcon />,
            },
            {
              text: "Add Student",
              path: "/admin/add-student",
              icon: <GroupAddIcon />,
            },
            {
              text: "Add Notice",
              path: "/admin/add-notice",
              icon: <DescriptionIcon />,
            },
            {
              text: "Add Placement Drive",
              path: "/admin/add-drive",
              icon: <NoteAddIcon />,
            },
            {
              text: "Students List",
              path: "/admin/all-students",
              icon: <ListAltIcon />,
            },
            {
              text: "Discussion-Forum",
              path: "/chat-forum",
              icon: <ForumIcon />,
            },
            {
              text: "View Drives",
              path: "/view-drives",
              icon: <PageviewIcon />,
            },
          ].map((doc, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{doc.icon}</ListItemIcon>
              <ListItemText primary={<Link to={doc.path}>{doc.text}</Link>} />
            </ListItem>
          ))}
        <List>
          {user &&
            ![1, 2].includes(user.role) &&
            [
              {
                text: "Dashboard",
                path: "/dashboard",
                icon: <DashboardIcon />,
              },
              {
                text: "Create Profile",
                path: "/create-profile",
                icon: <AccountCircleIcon />,
              },
              {
                text: "View Drives",
                path: "/view-drives",
                icon: <PageviewIcon />,
              },
              {
                text: "Discussion-Forum",
                path: "/chat-forum",
                icon: <ForumIcon />,
              },
              {
                text: "All Drives",
                path: "/student/all-drives",
                icon: (
                  <Avatar src="https://icon-library.com/images/apply-icon-png/apply-icon-png-24.jpg" />
                ),
              },
            ].map((doc, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{doc.icon}</ListItemIcon>
                <ListItemText primary={<Link to={doc.path}>{doc.text}</Link>} />
              </ListItem>
            ))}
        </List>
        {user && (
          <ListItem>
            <Button variant="outlined" color="secondary" onClick={logout}>
              Logout
            </Button>
          </ListItem>
        )}
      </List>
    </div>
  );

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.grow}>
      <AppBar position="static" className="d-flex justify-content-center">
        <Toolbar>
          {user && (
            <Button onClick={toggleDrawer("left", true)}>
              <MenuIcon />
            </Button>
          )}

          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to={"/"}>Material UI</Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <Avatar
                alt="profile-photo"
                // src={user ? user.providerData[0].photoURL : ""}
                component={Link}
                to={`/view-profile/${user && user.uid}`}
              /> */}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {/* <Avatar
                alt="profile-photo"
                src={user ? user.providerData[0].photoURL : ""}
              /> */}
            </IconButton>
          </div>
          <Badge badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
        </Toolbar>
      </AppBar>
    </div>
  );
}
