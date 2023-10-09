import React, { useContext, useEffect, useState } from "react";

import {
  AppBar,
  Drawer,
  ListItem,
  ListItemText,
  Toolbar,
  List,
  Typography,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { PRIMARY_COLOR } from "../../../constants";

import { Fab } from "@mui/material";

import {
  ClearAll,
  Dvr,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ListAltSharp,
  ManageAccounts,
  Money,
  PriceCheck,
  Receipt,
  Timeline,
} from "@mui/icons-material";

import { AuthContext } from "../../contextAPI/ContextAPI";
import {
  Search,
  AddCircle,
  ChargingStationRounded,
  Email,
  Engineering,
  ManageAccountsOutlined,
  ManageHistory,
  ManageSearch,
  ManageSearchRounded,
  ManageSearchSharp,
  ManageSearchTwoTone,
  SearchTwoTone,
  Sell,
  TrackChanges,
  Warehouse,
} from "@mui/icons-material";
import NotificationsDrawer from "../notificationsDrawer/notificationsDrawer";

const isMobile = window.innerWidth < 900;

const LogoContainer = styled.div`
  background-color: ${(props) =>
    props.drawerOpen ? "white" : isMobile ? "unset" : "white"};

  padding: ${(props) => (props.drawerOpen ? "0px" : isMobile ? "0px" : "10px")};

  border-radius: ${(props) =>
    props.drawerOpen ? (isMobile ? "20px" : "0px") : "0px"};
`;

const Logo = styled.img`
  width: 100%;

  margin-top: ${(props) =>
    props.drawerOpen ? (isMobile ? "15px" : "0px") : "0px"};

  padding: ${(props) =>
    props.drawerOpen ? (isMobile ? "0px" : "10px") : "0px"};

  height: ${(props) =>
    props.drawerOpen ? (isMobile ? "auto" : "60px") : "30px"};
`;

const DrawerContentContainer = styled.div`
  height: 100vh;

  background: ${PRIMARY_COLOR};

  transition: all 0.2s;

  border-radius: ${(props) => (props.drawerOpen ? "20px" : "10px")};

  overflow: hidden;

  border: 1px solid ${PRIMARY_COLOR};
`;

const DrawerListsContainer = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: space-between;

  height: calc(100% - 85px);
`;

const DrawerLink = styled(NavLink)`
  border-left: 5px solid transparent;

  transition: all 0.2s;

  &:hover,
  &.active {
    border-left: 5px solid white;

    ${(props) => props.isMobile && "border-radius:10px;"}

    ${(props) => props.isMobile && "background: white;"}

   i, span {
      color: ${(props) => (props.isMobile ? "black" : "white")} !important;
    }
  }
`;

const DrawerItemIcon = styled.i`
  color: white;
`;

const DrawerItemText = styled(ListItemText)`
  margin-left: 16;

  color: white;
`;

const DrawerAction = styled(ListItem)`
  gap: 10px;

  border-left: 5px solid transparent;

  transition: all 0.2s;

  &:hover,
  &.active {
    border-left: 5px solid white;

    ${(props) => props.isMobile && "border-radius:10px;"}

    ${(props) => props.isMobile && "background: white;"}

   i, span {
      color: ${(props) => (props.isMobile ? "black" : "white")} !important;
    }
  }
`;

const drawerWidth = 240;

const ComponentWrapper = (props) => {

  const [notification, setNotifications] = useState([])

  const fetchNotifications = async () => {
    try {
      let results = await window.Platform.database.fetchNotifications(auth.user.role);
      // console.log('notification frontend started',results);
      
setNotifications(results);      
    } catch (error) {
      console.error(error);
      window.NotificationUtils.showError("Error fetching Notifications");
    }
  };
useEffect(()=>{
  // fetchNotifications()
  setTimeout(() => {
    
  props.props.fetchNotifications()
  // console.log(props.props.notificationCount + " notifications")
  }, 1000);
},[props.props.showNotifications])
  
  // console.log("proppppps", props)

  const { auth, setAuth } = useContext(AuthContext);
  let test = [];
  test = auth?.permissions?.filter((val) => val.role === auth.user.role)[0];

  const initialDrawerState = JSON.parse(localStorage.getItem("isDrawerOpen"));

  // JSON.parse(localStorage.getItem('isDrawerOpen'))

  const [drawerOpen, setDrawerOpen] = useState(
    isMobile ? false : initialDrawerState
  );
  const getNotificationCount = () => {
    // let result = Number(
    //   props.user?.notifications ? props.user.notifications.length : 0
    // );
    // console.log('res',result)

    return notification.length;
  };

  const onClickLogout = async () => {
    try {
      await window.Platform.database.logOut();

      auth.onAuthUserChanged && auth.onAuthUserChanged();
    } catch (error) {
      window.NotificationUtils.showError("Something Went Wrong");
    }
  };
  console.log("Auth",auth)

  const getUserName = () => {
    let result = "";

    if (auth.user) {
      result = auth.user.firstName + "(" + auth.user.role + ")" || "";
    }

    let length = 25;

    if (result.length > length && isMobile) {
      result = result.slice(0, length - 3) + "...";
    }

    return result;
  };

  

  //left navigation
  const drawerData = [
    {
      title: "Category Data",
      icon: ManageAccounts,
      link: "/category",
      role: ["SI"],
    },{
      title: "Category Data",
      icon: ManageAccounts,
      link: "/category",
      role: ["SI"],
    },{
      title: "Category Data",
      icon: ManageAccounts,
      link: "/category",
      role: ["SI"],
    },{
      title: "Category Data",
      icon: ManageAccounts,
      link: "/category",
      role: ["SI"],
    },
    // {
    //   title: 'Tracking',
    //   icon: TrackChanges,
    //   link: '/tracking',
    //   role: ['admin'],
    // },
    {
      title: "Master Management",
      icon: Engineering,
      link: "/mastermanager",
      role: ["AM"],
    },
    
  
  ];

  const renderDrawerContent = () => {
    const filteredCards = drawerData.filter((card) =>
    {
          return card.role.includes( auth?.user?.profile__c)}
        );



    return (
      <DrawerContentContainer drawerOpen={drawerOpen}>
        <NavLink to={"/dashboard "} >
          <LogoContainer drawerOpen={drawerOpen}>
            <Logo 
              drawerOpen={drawerOpen}
              src={
                drawerOpen
                  ? "iillogo.png"
                  : isMobile
                    ? "iillogo.png"
                    : "Frame.png"
              }
            />
          </LogoContainer>
        </NavLink>

        <DrawerListsContainer>
          <List>
            {filteredCards.map((navItem) => {
              return (
                <DrawerLink
                  isMobile={isMobile}
                  key={navItem.title}
                  to={navItem.link}
                  className={"nav-link"}
                >
                  <ListItem style={{ gap: "10px" }}>
                    <Tooltip title={navItem.title} placement="left">

                      <DrawerItemIcon
                        className="icon material-icons"
                        as={navItem.icon}
                      ></DrawerItemIcon>
                    </Tooltip>

                    {drawerOpen && <DrawerItemText primary={navItem.title} />}
                  </ListItem>
                </DrawerLink>
              );
            })}
          </List>

          <List style={{ marginBottom: 10, width: "100%" }}>
            <Tooltip title="Log Out" placement="left">
            <DrawerAction
              isMobile={isMobile}
              className="nav-link"
              onClick={onClickLogout}
              style={{ cursor: "pointer" }}
            >
              <DrawerItemIcon className="icon material-icons">
                {"power_settings_new"}
              </DrawerItemIcon>

              {drawerOpen && <DrawerItemText primary={"Logout"} />}
            </DrawerAction>
            </Tooltip>
          </List>
        </DrawerListsContainer>
      </DrawerContentContainer>
    );
  };

  useEffect(() => {
    localStorage.setItem("isDrawerOpen", drawerOpen);
  }, [drawerOpen]);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Drawer
        style={{
          width: drawerOpen ? "240px" : "80px",

          transition: "all 0.2s",
        }}
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: drawerOpen ? "240px" : "80px",

          "& .MuiDrawer-paper": {
            padding: "10px",

            border: "none",

            background: isMobile ? PRIMARY_COLOR : "none",

            overflow: "visible",

            width: drawerOpen ? "240px" : "80px",

            transition: "all 0.2s",
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {!isMobile && (
          <Fab
            onClick={() => setDrawerOpen((prev) => !prev)}
            size="small"
            sx={{
              position: "absolute",

              right: "-7px",

              top: "180px",

              zIndex: "5",

              borderRadius: "40px",

              width: "40px",

              height: "40px",

              boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 26%)",

              // background: ,

              color: PRIMARY_COLOR,

              transition: "all 0.2s",
            }}
          >
            {drawerOpen ? (
              <KeyboardArrowLeft sx={{ fontSize: "28px" }} />
            ) : (
              <KeyboardArrowRight sx={{ fontSize: "28px" }} />
            )}
          </Fab>
        )}

        {renderDrawerContent()}
      </Drawer>

      <div style={{ width: "100%" }}>
        
        <AppBar
          position="sticky"
          style={{ boxShadow: !isMobile&&"none", background: "#eeeeee", top: "0", left: "0" }}
        >
          <Toolbar>
            <div
              style={{
                display: "flex",

                justifyContent: "space-between",

                width: "100%",

                alignItems: "center",
                // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              {isMobile && (
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              )}

              <Typography
                style={{ color: "black", textTransform: "initial" }}
                variant="h6"
              >
                {/* {getUserName()} */}
              </Typography>
            <Tooltip title="Click to see Notification" placement="left">
              <IconButton
               onClick={() => {
                // props.props.setShowNotifications(true)
               }}
                >
                <Badge
                  color="primary"
                  // badgeContent={props.props.notificationCount}
                  // badgeContent={notification}
                  
                  max={9}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              </Tooltip>

            </div>
          </Toolbar>
        </AppBar>

        <div>{props.children}</div>
      </div>
      
    </div>
  );
};

export default ComponentWrapper;