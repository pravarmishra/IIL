import React, { useEffect, useState, forwardRef, useContext } from "react";
import styled from "styled-components";
import { Card, Drawer, Typography } from "@mui/material";
import { PRIORITY_COLORS, PRIORITY_TYPES } from "../../../constants";
import moment from "moment";
import { AuthContext } from "../../contextAPI/ContextAPI";
import OpaqueLoading from "../../opaqueLoading/opaqueLoading";
import { Link, Navigate } from "react-router-dom";
import { Navigation } from "@mui/icons-material";

const getNotificationColor = (priority) => {
  switch (priority) {
    case PRIORITY_TYPES.HIGH:
      return PRIORITY_COLORS.HIGH;
    case PRIORITY_TYPES.MEDIUM:
      return PRIORITY_COLORS.MEDIUM;
    case PRIORITY_TYPES.LOW:
      return PRIORITY_COLORS.LOW;
    default:
      console.warn("Invalid Notification Priority:", priority);
      return PRIORITY_COLORS.DEFAULT; // Return a default color or handle the invalid case as needed
  }
};

const DrawerContentContainer = styled.div`
  padding: 15px;
  height: 100%;
  background-color: #d3d3d338;
  width: 300px;
  overflow-y: auto;
`;

const NotificationCard = styled(Card)`
  margin-bottom: 20px;
  padding: 8px;
  background-color: ${(props) => getNotificationColor(props.priority)};
`;

const NotificationText = styled(Typography)`
  text-transform: none;
  white-space: pre-wrap;
`;

const CreatedDateText = styled.div`
  margin-bottom: 5px;
`;

const CenterContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotificationContainer = styled.div`
 ${props => props.route && "cursor: pointer;"}
`

const NotificationsDrawer = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(props.showNotifications || false);
  const [navigate, setNavigate] = useState(false)

  const { auth, setAuth } = useContext(AuthContext);
  let test = [];
  test = auth?.permissions?.filter((val) => val.role === auth.user.role)[0]
  // console.log(`my test: ${test}`);

  const getCreatedDate = (date) => {
    return moment(date).format("Do MMMM YYYY, h:mm a");
  }

  const fetchNotifications = async () => {
    try {
      let results = await window.Platform.database.fetchNotifications();
      // console.log('notification frontend started' + results);
      if (results && notifications.length === 0) {
        setNotifications(results);
        
      }
    } catch (error) {
      console.error(error);
      window.NotificationUtils.showError("Error fetching Notifications");
    }
  };

  const markNotificationsRead = async () => {
    try {
      // console.log('mmmmarks read',notifications)
setLoading(true)
      await window.Platform.database.markNotificationsRead(notifications);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)

    }
  }

  useEffect(() => {
    fetchNotifications();
    ref.current = fetchNotifications;
  },[])

  useEffect(() => {
    if (props.showNotifications !== showNotifications) {
      setShowNotifications(props.showNotifications);
    }
  }, [props.showNotifications])

  const navigateTo = (route) => {
    if (route) {
      props.history && props.history.replace(route);
      closeDrawer();
    }
  }

  const closeDrawer = () => {
    setShowNotifications(false);
    props.setShowNotifications(false);
    if (notifications.length > 0) {
      setNotifications([]);
      markNotificationsRead();
    }
  };

  const renderNotifications = () => {
    return (
      <DrawerContentContainer>
        {notifications.map((notification) => {
          // Convert 'createdAt' string to a Date object
          const createdAtDate = new Date(notification.updatedAt);

          // console.log('notification: ',notification.text);

          return (
            <Link to= {notification.routeTo||"/dashboard"}>
            <NotificationContainer
              route={notification.routeTo}
              onClick={() => {
                // console.log("notificationRoutes Test",notification.route)
                // setNavigate(true)
              // return <Navigate to={notification.routeTo} />
              }}
              key={notification.objectId} // Use 'objectId' as the key
            >
              <CreatedDateText>
                <Typography variant="">
                  {getCreatedDate(createdAtDate)} {/* Format the date */}
                </Typography>
              </CreatedDateText>
              <NotificationCard raised priority={notification.priority}>
                <NotificationText display="block" variant="subtitle1">
                  {notification.text}
                </NotificationText>
              </NotificationCard>
              {/* {navigate && <Navigate to={notification.routeTo} />} */}
            </NotificationContainer>
            </Link>
          );
        })}

        {notifications.length === 0 && (
          <CenterContainer>
            <Typography variant="body1">No new notifications found</Typography>
          </CenterContainer>
        )}
      </DrawerContentContainer>
    );
  };

  return (

    <Drawer
      anchor={"right"}
      onClose={closeDrawer}
      open={props.showNotifications}
    >
{loading && <OpaqueLoading />}
      {renderNotifications()}
    </Drawer>
  );
});

export default NotificationsDrawer;
