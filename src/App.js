// import React, { createRef, forwardRef, useContext, useEffect, useRef, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { PRIMARY_COLOR } from "./constants";
// import SnackbarWrapper from './components/common/snackbar';
// import { createBrowserHistory, createHashHistory } from "history";
// import mainRoutes from "./routes/index";
// import { ROLES, ERROR_CODES, LOCAL_STORAGE_KEYS } from './constants';
// import router from './routes';
// import database from "./modules/database/database";
// import { AuthContext } from './components/contextAPI/ContextAPI';
// import PrivateRoute from './components/PrivateRoutes';
// import OpaqueLoading from './components/opaqueLoading/opaqueLoading';
// import { CircularProgress } from '@mui/material';
// import $ from 'jquery';

// // import { Spinner } from '@mui/material';
// import "./App.css";
// import Header from './components/header';
// import CustomConfirmModal from './components/modals/CustomConfirmModal';
// import NotificationsDrawer from "./components/common/notificationsDrawer/notificationsDrawer";
// import ComponentWrapper from './components/common/drawer/drawer';
// // import FadeRoute from './routes/FadeRoutes';


// // import { AuthContext } from './components/contextAPI/ContextAPI';
// // import RouterComponent from './routes';
// // import Router from './routes';
// // import AppRouter from './routes';



// const history = createBrowserHistory();
// const isMobile = window.innerWidth < 900;


// window.Platform.database = database;
// window.$ = $;

// function App({ setShowNotifications, showNotifications }) {
//   const [userLoading, setUserLoading] = useState(false)
//   const { auth, setAuth } = useContext(AuthContext)

//   const [roleAccess, setRoleAccess] = useState([])

//   const [loggedIn, setLoggedIn] = useState(false)
//   const [user, setUser] = useState(null)
//   const [roleAccessLoading, setRoleAccessLoading] = useState(false)

//   const [loading, setLoading] = useState(false);

//   const notificationsRef = useRef();
//   const notificationDrawerRef = useRef(null);
//   const [notificationCount, setNotificationCount] = useState(0)
//   // const confirmationModalRef = useRef();


//   let contextState = { ...auth };
//   // useEffect(()=>{
//   //   console.log("state set",user);
//   // },[user])
//   // useEffect(()=>{
//   //   verifyUserSession()
//   // },[])
//   const verifyUserSession = async () => {
//     if (user) {
//       // console.log("hello")
//       try {

//         let sessionVerification =
//           await window.Platform.database.verifyUserSession(
//             user.sessionToken
//           );
//         //  setUser(sessionVerification.attributes);

//       } catch (error) {
//         window.NotificationUtils.showInfo(
//           "Session Expired, please login again"
//         );
//         logout();
//       }
//     }
//   }
// //   const fetchNotifications = async () => {
// //     try {
// //       let results = await window.Platform.database.fetchNotifications(auth.user.role);
// //       // console.log('notification frontend started',results);
// // setNotificationCount(results.length)
// //     } catch (error) {
// //       console.error(error);
// //       window.NotificationUtils.showError("Error fetching Notifications");
// //     }
// //   };
//   // let a = user;
//   useEffect(()=>{
//     // console.log('workingggggg....')
//     verifyUserSession()
//     // console.log(user)

//   }, [user])

//   useEffect(() => {


//     let storedUser;
//     try {
//       storedUser = JSON.parse(
//         window.localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_USER_DATA)
//       );

//     } catch (error) {
//       console.error(error);
//     }

//     if (storedUser) {
//       setUser(storedUser);
//       contextState.loggedIn = true
//       contextState.token = storedUser.sessionToken
//       contextState.user = storedUser
//       contextState.email = storedUser.email
//       contextState.onAuthUserChanged = onAuthUserChanged
//       contextState.onUserChange = onUserChange
//       contextState.history = history
//       setAuth(contextState)
//       // setAuth(storedUser)
//       setLoggedIn(true);
//     } else {
   
//       logout();
//     }

//     // getRolesAccess()
//   }, []);

//   // useEffect(()=>{
//   //   if(auth) 
//   //   {setLoggedIn(true)
//   //     console.log("loggedIn")
//   //   }

//   // },[auth])
//   const renderLoading = () => {
//     return (
//       <div className="loadingCentered">
//         <CircularProgress color="primary" />
//       </div>
//     );
//   };


// // const getRolesAccess = async () => {
// //   try {
// //     setRoleAccessLoading(true)
// //     const permissions = await database.getRolesAccess()
// //     setRoleAccess(permissions)
// //     // console.log("permissions",permissions)
// //     contextState.permissions = permissions

// //       // window.Platform.permissions = permissions
// //     } catch (error) {
// //       console.error(error)
// //     }
// //     finally {
// //       setRoleAccessLoading(false)
// //     }
// //   }

//   const logout = async () => {
//     window.localStorage.clear();
//     // setState({
//     //   loading: false,
//     //   loggedIn: false,
//     //   user: null,
//     // });
//     // setLoading(false)
//     contextState.loading = true
//     setLoggedIn(false)
//     setUser(null)
//     var currentPath = history.location;
//     // console.log(currentPath.pathname)
//     if (currentPath.pathname !== "/login" && currentPath.pathname !== "/quotationapprovallink"
//       && currentPath.pathname !== "/platformInvite") {
//       let redirectPath = "/login";
//       // console.log("redirectionpath", redirectPath);
//       history.replace(redirectPath);
//       window.location.reload();
//       // console.log("currentPathHerreredirect", currentPath.pathname);
//     }
//   };

//   const onAuthUserChanged = async () => {
//     try {
//       contextState.loading = true
//       onUserChange();
//       // console.log("auth check")

//     } catch (e) {
//       console.error(e);
//       window.Platform.database.signOut();
//       return;
//     }
//     finally {
//       contextState.loading = false
//     }
//   }
//   const checkUpdateNeeded = async () => {
//     try {
//       // console.log("vchecking....")
//       let localVersion = process.env.REACT_APP_VERSION?.toString();
//       // console.log("local", localVersion)
//       let globalVersion = await window.Platform.database.getAppVersion();
//       // console.log(globalVersion.attributes.version)
//       globalVersion = globalVersion.attributes.version
//       let updated = JSON.parse(
//         window.localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_UPDATED)
//       );
//       if (updated) {
//         let message = "";
//         if (isMobile) {
//           message =
//             "Webapp has been updated, please close the app and open again";
//         } else {
//           message =
//             "Webapp has been updated, please close the tab and open again";
//         }
//         window.localStorage.removeItem(LOCAL_STORAGE_KEYS.HAS_UPDATED);
//         setTimeout(() => {
//           window.NotificationUtils.showInfo(message);
//         }, 2000);
//       } else if (
//         !updated &&
//         localVersion &&
//         globalVersion &&
//         localVersion != globalVersion
//       ) {
//         window.localStorage.setItem(
//           LOCAL_STORAGE_KEYS.HAS_UPDATED,
//           JSON.stringify(true)
//         );
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   const routeTo = (path) => {
//     history.replace(path ? path : "/dashboard");
//   };

//   const getUrlPath = async () => {
//     let pathParameters = "";
//     try {
//       let queryIndex = window.location.hash.indexOf("?");
//       if (queryIndex >= 0) {
//         pathParameters = window.location.hash.substring(queryIndex);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     let urlParams = new URLSearchParams(pathParameters);
//     return urlParams.get("route");
//   }

//   const onClickLogout = async () => {
//     await window.Platform.database.signOut();
//     onAuthUserChanged();
//   };

//   const onUserChange = async (forced = false) => {
//     try {
//       setUserLoading(true)
//       let userData = await window.Platform.database.getUserData(forced);
//       if (userData && userData.attributes) {
//         // if([ROLES.BD_FOS,ROLES.RETENTION_FOS,ROLES.FOS_SPECIAL].includes(userData.attributes.role)){
//         //   throw ERROR_CODES.INVALID_ROLE_ACCESS;
//         // }
//         // this.setState({
//         //   user: userData.attributes,
//         //   loggedIn: true,
//         //   loading: false,
//         // });
//         setUser(userData.attributes)
//         // console.log(contextState)
//         contextState.loggedIn = true
//         contextState.token = userData.attributes.sessionToken
//         contextState.user = userData.attributes
//         contextState.email = userData.attributes.email
//         contextState.onAuthUserChanged = onAuthUserChanged
//         contextState.onUserChange = onUserChange
//         contextState.history = history
//         setAuth(contextState)
//         setLoggedIn(true)
//         // setLoading(false)
//         // contextState.loading = false
//       }
//       window.localStorage.setItem(
//         LOCAL_STORAGE_KEYS.STORED_USER_DATA,
//         JSON.stringify(userData)
//       );
//       var currentPath = history.location;
//       // console.log("this will be the path",currentPath);
//       if (currentPath.pathname === "/login") {
//         let redirectPath = "/";
//         history.replace(redirectPath);
//       }
//       else {
//         throw "error"
//       }
//     } catch (error) {
//       logout();
//       if (error === ERROR_CODES.INVALID_ROLE_ACCESS) {
//         window.NotificationUtils.showError("Something went wrong");
//         // console.log(error.message)
//       }
//       return;
//     }
//     finally {
//       setUserLoading(false)
//     }
//   }

//   const renderNavBarHeader = (prop) => {
//     if (prop.hideNavBar || isMobile) {
//       return;
//     }
//     let location = history.location;
//     return (
//       <Header
//         setShowNotifications={setShowNotifications}
//         onAuthUserChanged={onAuthUserChanged}
//         history={history}
//         location={location}
//         user={user}
//         {...prop}
//       />
//     );
//   };

//   // setShowNotifications = (value) => {
//   //   this.setState({
//   //     ...this.state,
//   //     showNotifications: value,
//   //   })                
//   // }

//   // const handleButtonClick = () => {
//   //   window.NotificationUtils.showSuccess('This is a success notification.');
//   // };

//   // ...

//   const renderContent = () => {
//     let location = history.location;
//     let path = (location && location.pathname) || "";
//     if (path) {
//       path = path.replace("/", "");
//     }

//     // Define userRow here
//     // let userRow = roleAccess.filter((p) => p.role === user?.role)[0];

//     return (
//       <>
//         <div className="App">
//           <Routes>
//             <Route>

//               {mainRoutes(loggedIn, user, history.location).map((prop, key) => {
//                 if (prop.redirect) {
//                   return (
//                     <Route
//                       path={prop.path}
//                       element={
//                         <Navigate
//                           to={
//                             prop.pathTo + (loggedIn || !path ? "" : `?route=${path}`)
//                           }
//                           replace
//                         />
//                       }
//                       key={key}
//                     />
//                   );
//                 }

//                 // if (!!prop.accessSelector) {
//                 //   if (userRow && !userRow[prop.accessSelector]?.read) {
//                 //     return (
//                 //       <Route
//                 //         path="/"
//                 //         element={<Navigate to="/" replace />}
//                 //         key={key}
//                 //       />
//                 //     );
//                 //   }
//                 // }

//                 if (prop.component) {
//                   return (
//                     <Route
//                       exact
//                       path={prop.path}
//                       element={
//                         <div
//                           className="effectStyle"
//                           style={{ opacity: 1, transition: "opacity 0.5s ease-in" }}
//                         >
//                           {renderNavBarHeader(prop)}

//                           <PrivateRoute>
//                             <prop.component
//                               user={user}
//                               loggedIn={loggedIn}
//                               onUserChange={onUserChange}
//                               onAuthUserChanged={onAuthUserChanged.bind(this)}
//                               history={history}
//                               showNotifications={showNotifications}
//                               setShowNotifications={setShowNotifications}
//                               notificationCount={notificationCount}
//                               // fetchNotifications={fetchNotifications}
//                             />
//                           </PrivateRoute>
//                         </div>
//                       }
//                       key={key}
//                     />
//                   );
//                 }

//                 return null;
//               })}
//             </Route>
//           </Routes>
//         </div>
//       </>
//     );
//   };

//   return (
//     <div className="AppContainer">

//       {!contextState.loading&& !userLoading ? renderContent() :
//         renderLoading()
//       }

//       {/* <Snackbar ref={this.notificationsRef} /> */}
//     </div>
//   );
// }

// function ThemeWrapper() {

//   const theme = createTheme({
//     typography: {
//       fontFamily: '"Montserrat", sans-serif',
//       htmlFontSize: 18,
//     },
//     palette: {
//       secondary: {
//         main: "#455a64",
//         light: "rgb(106, 123, 131)",
//         dark: "rgb(48, 62, 70)",
//         contrastText: "#fff",
//       },
//       common: {
//         black: "#000",
//         white: "#fff",
//       },
//       error: {
//         light: "#e57373",
//         main: "#f44336",
//         dark: "#d32f2f",
//         contrastText: "#fff",
//       },
//       type: "light",
//       action: {
//         hoverOpacity: 0.08,
//         hover: "rgba(0, 0, 0, 0.08)",
//         selected: "rgba(0, 0, 0, 0.14)",
//         disabledBackground: "rgba(0, 0, 0, 0.12)",
//         disabled: "rgba(0, 0, 0, 0.26)",
//         active: "rgba(0, 0, 0, 0.54)",
//       },
//       primary: {
//         main: PRIMARY_COLOR,
//         light: "#E47F5D",
//         dark: "#118572",
//         contrastText: "#fff",
//       },
//     },

//   });

//   const notificationRef = useRef();
//   const confirmationModalRef = useRef();

//   // useEffect(() => {
//   // console.log(window.NotificationUtils)
//   // window.NotificationUtils.showSuccess("login")
//   // }, []);


//   const initializeNotificationFunctions = () => {
//     window.NotificationUtils = {

//       showSuccess: (msg, params = {}) => {
//         notificationRef.current.showSuccess(msg, params);
//       },
//       showError: (msg, params = {}) => {
//         notificationRef.current.showError(msg, params);
//       },
//       showWarning: (msg, params = {}) => {
//         notificationRef.current.showWarning(msg, params);
//       },
//       showInfo: (msg, params = {}) => {
//         notificationRef.current.showInfo(msg, params);
//       },
//     };
//   };
//   const initializeModals = () => {
//     window.requestPasswordReset = async (email = "") => {
//       try {
//         let em = email;
//         if (!email) {
//           em = this.state.user.email;
//         }
//        let res = await window.Platform.database.requestPasswordReset(em);
//       //  console.log(res)
       
//         window.NotificationUtils.showSuccess(
//           "An email for password reset has been sent successfully"
//         );
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     };

//     window.confirmationModal = (
//       message,
//       confirmCallback,
//       cancelCallback,
//       extras
//     ) => {
//       confirmationModalRef.current &&
//         confirmationModalRef.current.show(
//           message,
//           confirmCallback,
//           cancelCallback,
//           extras
//         );
//     };

//   }

//   const initializeCommonUseFunctions = () => {


//     window.trimEmail = (email) => {
//       let trimmedEmail = email.trim();
//       let result = trimmedEmail.toLowerCase();
//       return result;
//     };
//     window.isValidPincode = (str) => {
//       // Regex to check valid
//       // Pincode of India
//       if (str && str.length == 0)
//         return true;
//       else {

//         let regex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);

//         // if str
//         // is empty return false
//         if (str == null) {
//           return "false";
//         }

//         // Return true if the str
//         // matched the ReGex
//         if (regex.test(str) == true) {
//           return true;
//         }
//         else {
//           return false;
//         }
//       }
//     }
//     window.isValidMobile = (mobile_number) => {
//       // Regex to check valid
//       // mobile_number 
//       let regex = new RegExp(/^[6-9][0-9]{9}$/);

//       // if mobile_number
//       // is empty return false
//       if (mobile_number == null) {
//         return false;
//       }

//       // Return true if the mobile_number
//       // matched the ReGex
//       if (regex.test(mobile_number) == true) {
//         return true;
//       }
//       else {
//         return false;
//       }
//     }
//     window.limitTextSize = (text, maxLength) => {

//       if (text.length > maxLength) {
//         return text.substring(0, maxLength) + "...";
//       } else {
//         return text;
//       }
//     }
//   }


//   initializeNotificationFunctions();
//   initializeCommonUseFunctions();
//   initializeModals();
//   // verifyUserSession()

//   const notificationDrawerRef = useRef(null);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     let storedUser;
//     try {
//       storedUser = JSON.parse(
//         window.localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_USER_DATA)
//       );
//       setUser(storedUser);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <Router> {/* Add the Router component here */}
//         {/* <ComponentWrapper setShowNotifications={setShowNotifications} /> */}
//         <CustomConfirmModal ref={confirmationModalRef} />
//         {/* {user && (
//           <NotificationsDrawer
//             ref={notificationDrawerRef}
//             setShowNotifications={setShowNotifications}
//             showNotifications={showNotifications}
//             history={history}
//           />
//         )} */}
//         <SnackbarWrapper ref={notificationRef} />
//         <App />
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default ThemeWrapper;
import React, { createRef, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PRIMARY_COLOR } from "./constants";
import SnackbarWrapper from './components/common/snackbar';
import { createBrowserHistory, createHashHistory } from "history";
import mainRoutes from "./routes/index";
import { ROLES, ERROR_CODES, LOCAL_STORAGE_KEYS } from './constants';
import router from './routes';
import database from "./modules/database/database";
import { AuthContext } from './components/contextAPI/ContextAPI';
import PrivateRoute from './components/PrivateRoutes';
import OpaqueLoading from './components/opaqueLoading/opaqueLoading';
import { CircularProgress } from '@mui/material';
import $ from 'jquery';

// import { Spinner } from '@mui/material';
import "./App.css";
import Header from './components/header';
import CustomConfirmModal from './components/modals/CustomConfirmModal';
import NotificationsDrawer from "./components/common/notificationsDrawer/notificationsDrawer";
import ComponentWrapper from './components/common/drawer/drawer';
// import FadeRoute from './routes/FadeRoutes';


// import { AuthContext } from './components/contextAPI/ContextAPI';
// import RouterComponent from './routes';
// import Router from './routes';
// import AppRouter from './routes';



const history = createBrowserHistory();
const isMobile = window.innerWidth < 900;


window.Platform.database = database;
window.$ = $;

function App({ setShowNotifications, showNotifications }) {
  const [userLoading, setUserLoading] = useState(false)
  const { auth, setAuth } = useContext(AuthContext)

  const [roleAccess, setRoleAccess] = useState([])

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [roleAccessLoading, setRoleAccessLoading] = useState(false)

  const [loading, setLoading] = useState(false);

  const notificationsRef = useRef();
  const notificationDrawerRef = useRef(null);
  const [notificationCount, setNotificationCount] = useState(0)
  // const confirmationModalRef = useRef();


  let contextState = { ...auth };
  // useEffect(()=>{
  //   console.log("state set",user);
  // },[user])
  // useEffect(()=>{
  //   verifyUserSession()
  // },[])
  const verifyUserSession = async () => {
    if (user) {
      // console.log("hello")
      try {

        let sessionVerification =
          await window.Platform.database.verifyUserSession(
            user.sessionToken
          );
        //  setUser(sessionVerification.attributes);

      } catch (error) {
        window.NotificationUtils.showInfo(
          "Session Expired, please login again"
        );
        logout();
      }
    }
  }
  const fetchNotifications = async () => {
    try {
      // let results = await window.Platform.database.fetchNotifications(auth.user.role);
      // console.log('notification frontend started',results);
// setNotificationCount(results.length)
    } catch (error) {
      console.error(error);
      window.NotificationUtils.showError("Error fetching Notifications");
    }
  };
  // let a = user;
  useEffect(()=>{
    // console.log('workingggggg....')
    verifyUserSession()
    // console.log(user)

  }, [user])

  useEffect(() => {


    let storedUser;
    try {
      storedUser = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_USER_DATA)
      );

    } catch (error) {
      console.error(error);
    }

    if (storedUser) {
      setUser(storedUser);
      contextState.loggedIn = true
      contextState.token = storedUser.sessionToken
      contextState.user = storedUser
      contextState.email = storedUser.email
      contextState.onAuthUserChanged = onAuthUserChanged
      contextState.onUserChange = onUserChange
      contextState.history = history
      setAuth(contextState)
      // setAuth(storedUser)
      setLoggedIn(true);
    } else {
   
      logout();
    }

    getRolesAccess()
  }, []);

  // useEffect(()=>{
  //   if(auth) 
  //   {setLoggedIn(true)
  //     console.log("loggedIn")
  //   }

  // },[auth])
  const renderLoading = () => {
    return (
      <div className="loadingCentered">
        <CircularProgress color="primary" />
      </div>
    );
  };
console.log("CONTEXTSTATE",contextState)

const getRolesAccess = async () => {
  try {
    setRoleAccessLoading(true)
    if(user.profile__c==="SI"){
      const permissions=["category"]
      console.log("CHECK")
    // const permissions = await database.getRolesAccess()
    setRoleAccess(permissions)
    // console.log("permissions",permissions)
    contextState.permissions = permissions
    }
      // window.Platform.permissions = permissions
    } catch (error) {
      console.error(error)
    }
    finally {
      setRoleAccessLoading(false)
    }
  }

  const logout = async () => {
    window.localStorage.clear();
    // setState({
    //   loading: false,
    //   loggedIn: false,
    //   user: null,
    // });
    // setLoading(false)
    contextState.loading = true
    setLoggedIn(false)
    setUser(null)
    var currentPath = history.location;
    // console.log(currentPath.pathname)
    if (currentPath.pathname !== "/login" && currentPath.pathname !== "/quotationapprovallink"
      && currentPath.pathname !== "/platformInvite") {
      let redirectPath = "/login";
      // console.log("redirectionpath", redirectPath);
      history.replace(redirectPath);
      window.location.reload();
      // console.log("currentPathHerreredirect", currentPath.pathname);
    }
  };

  const onAuthUserChanged = async () => {
    try {
      contextState.loading = true
      onUserChange();
      // console.log("auth check")

    } catch (e) {
      console.error(e);
      window.Platform.database.signOut();
      return;
    }
    finally {
      contextState.loading = false
    }
  }
  const checkUpdateNeeded = async () => {
    try {
      // console.log("vchecking....")
      let localVersion = process.env.REACT_APP_VERSION?.toString();
      // console.log("local", localVersion)
      let globalVersion = await window.Platform.database.getAppVersion();
      // console.log(globalVersion.attributes.version)
      globalVersion = globalVersion.attributes.version
      let updated = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_UPDATED)
      );
      if (updated) {
        let message = "";
        if (isMobile) {
          message =
            "Webapp has been updated, please close the app and open again";
        } else {
          message =
            "Webapp has been updated, please close the tab and open again";
        }
        window.localStorage.removeItem(LOCAL_STORAGE_KEYS.HAS_UPDATED);
        setTimeout(() => {
          window.NotificationUtils.showInfo(message);
        }, 2000);
      } else if (
        !updated &&
        localVersion &&
        globalVersion &&
        localVersion != globalVersion
      ) {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEYS.HAS_UPDATED,
          JSON.stringify(true)
        );
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const routeTo = (path) => {
    history.replace(path ? path : "/dashboard");
  };

  const getUrlPath = async () => {
    let pathParameters = "";
    try {
      let queryIndex = window.location.hash.indexOf("?");
      if (queryIndex >= 0) {
        pathParameters = window.location.hash.substring(queryIndex);
      }
    } catch (error) {
      console.error(error);
    }
    let urlParams = new URLSearchParams(pathParameters);
    return urlParams.get("route");
  }

  const onClickLogout = async () => {
    await window.Platform.database.signOut();
    onAuthUserChanged();
  };

  const onUserChange = async (forced = false) => {
    try {
      setUserLoading(true)
      let userData = await window.Platform.database.getUserData(forced);
      if (userData && userData.attributes) {
        // if([ROLES.BD_FOS,ROLES.RETENTION_FOS,ROLES.FOS_SPECIAL].includes(userData.attributes.role)){
        //   throw ERROR_CODES.INVALID_ROLE_ACCESS;
        // }
        // this.setState({
        //   user: userData.attributes,
        //   loggedIn: true,
        //   loading: false,
        // });
        setUser(userData.attributes)
        // console.log(contextState)
        contextState.loggedIn = true
        contextState.token = userData.attributes.sessionToken
        contextState.user = userData.attributes
        contextState.email = userData.attributes.email
        contextState.onAuthUserChanged = onAuthUserChanged
        contextState.onUserChange = onUserChange
        contextState.history = history
        setAuth(contextState)
        setLoggedIn(true)
        // setLoading(false)
        // contextState.loading = false
      }
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.STORED_USER_DATA,
        JSON.stringify(userData)
      );
      var currentPath = history.location;
      // console.log("this will be the path",currentPath);
      if (currentPath.pathname === "/login") {
        let redirectPath = "/";
        history.replace(redirectPath);
      }
      else {
        throw "error"
      }
    } catch (error) {
      logout();
      if (error === ERROR_CODES.INVALID_ROLE_ACCESS) {
        window.NotificationUtils.showError("Something went wrong");
        // console.log(error.message)
      }
      return;
    }
    finally {
      setUserLoading(false)
    }
  }

  const renderNavBarHeader = (prop) => {
    if (prop.hideNavBar || isMobile) {
      return;
    }
    let location = history.location;
    return (
      <Header
        setShowNotifications={setShowNotifications}
        onAuthUserChanged={onAuthUserChanged}
        history={history}
        location={location}
        user={user}
        {...prop}
      />
    );
  };

  // setShowNotifications = (value) => {
  //   this.setState({
  //     ...this.state,
  //     showNotifications: value,
  //   })                
  // }

  // const handleButtonClick = () => {
  //   window.NotificationUtils.showSuccess('This is a success notification.');
  // };

  // ...

  const renderContent = () => {
    let location = history.location;
    let path = (location && location.pathname) || "";
    if (path) {
      path = path.replace("/", "");
    }

    // Define userRow here
    // let userRow = roleAccess.filter((p) => p.role === user?.role)[0];

    return (
      <>
        <div className="App">
          <Routes>
            <Route>

              {mainRoutes(loggedIn, user, history.location).map((prop, key) => {
                if (prop.redirect) {
                  return (
                    <Route
                      path={prop.path}
                      element={
                        <Navigate
                          to={
                            prop.pathTo + (loggedIn || !path ? "" : `?route=${path}`)
                          }
                          replace
                        />
                      }
                      key={key}
                    />
                  );
                }

                // if (!!prop.accessSelector) {
                //   if (userRow && !userRow[prop.accessSelector]?.read) {
                //     return (
                //       <Route
                //         path="/"
                //         element={<Navigate to="/" replace />}
                //         key={key}
                //       />
                //     );
                //   }
                // }

                if (prop.component) {
                  return (
                    <Route
                      exact
                      path={prop.path}
                      element={
                        <div
                          className="effectStyle"
                          style={{ opacity: 1, transition: "opacity 0.5s ease-in" }}
                        >
                          {renderNavBarHeader(prop)}

                          <PrivateRoute>
                            <prop.component
                              user={user}
                              loggedIn={loggedIn}
                              onUserChange={onUserChange}
                              onAuthUserChanged={onAuthUserChanged.bind(this)}
                              history={history}
                              showNotifications={showNotifications}
                              setShowNotifications={setShowNotifications}
                              notificationCount={notificationCount}
                              fetchNotifications={fetchNotifications}
                            />
                          </PrivateRoute>
                        </div>
                      }
                      key={key}
                    />
                  );
                }

                return null;
              })}
            </Route>
          </Routes>
        </div>
      </>
    );
  };

  return (
    <div className="AppContainer">

      {!contextState.loading && !roleAccessLoading && !userLoading ? renderContent() :
        renderLoading()
      }

      {/* <Snackbar ref={this.notificationsRef} /> */}
    </div>
  );
}

function ThemeWrapper() {

  const theme = createTheme({
    typography: {
      fontFamily: '"Montserrat", sans-serif',
      htmlFontSize: 18,
    },
    palette: {
      secondary: {
        main: "#455a64",
        light: "rgb(106, 123, 131)",
        dark: "rgb(48, 62, 70)",
        contrastText: "#fff",
      },
      common: {
        black: "#000",
        white: "#fff",
      },
      error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff",
      },
      type: "light",
      action: {
        hoverOpacity: 0.08,
        hover: "rgba(0, 0, 0, 0.08)",
        selected: "rgba(0, 0, 0, 0.14)",
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        disabled: "rgba(0, 0, 0, 0.26)",
        active: "rgba(0, 0, 0, 0.54)",
      },
      primary: {
        main: PRIMARY_COLOR,
        light: "#E47F5D",
        dark: PRIMARY_COLOR,
        contrastText: "#fff",
      },
    },

  });

  const notificationRef = useRef();
  const confirmationModalRef = useRef();

  // useEffect(() => {
  // console.log(window.NotificationUtils)
  // window.NotificationUtils.showSuccess("login")
  // }, []);


  const initializeNotificationFunctions = () => {
    window.NotificationUtils = {

      showSuccess: (msg, params = {}) => {
        notificationRef.current.showSuccess(msg, params);
      },
      showError: (msg, params = {}) => {
        notificationRef.current.showError(msg, params);
      },
      showWarning: (msg, params = {}) => {
        notificationRef.current.showWarning(msg, params);
      },
      showInfo: (msg, params = {}) => {
        notificationRef.current.showInfo(msg, params);
      },
    };
  };
  const initializeModals = () => {
    window.requestPasswordReset = async (email = "") => {
      try {
        let em = email;
        if (!email) {
          em = this.state.user.email;
        }
       let res = await window.Platform.database.requestPasswordReset(em);
      //  console.log(res)
       
        window.NotificationUtils.showSuccess(
          "An email for password reset has been sent successfully"
        );
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    window.confirmationModal = (
      message,
      confirmCallback,
      cancelCallback,
      extras
    ) => {
      confirmationModalRef.current &&
        confirmationModalRef.current.show(
          message,
          confirmCallback,
          cancelCallback,
          extras
        );
    };

  }

  const initializeCommonUseFunctions = () => {


    window.trimEmail = (email) => {
      let trimmedEmail = email.trim();
      let result = trimmedEmail.toLowerCase();
      return result;
    };
    window.isValidPincode = (str) => {
      // Regex to check valid
      // Pincode of India
      if (str && str.length == 0)
        return true;
      else {

        let regex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);

        // if str
        // is empty return false
        if (str == null) {
          return "false";
        }

        // Return true if the str
        // matched the ReGex
        if (regex.test(str) == true) {
          return true;
        }
        else {
          return false;
        }
      }
    }
    window.isValidMobile = (mobile_number) => {
      // Regex to check valid
      // mobile_number 
      let regex = new RegExp(/^[6-9][0-9]{9}$/);

      // if mobile_number
      // is empty return false
      if (mobile_number == null) {
        return false;
      }

      // Return true if the mobile_number
      // matched the ReGex
      if (regex.test(mobile_number) == true) {
        return true;
      }
      else {
        return false;
      }
    }
    window.limitTextSize = (text, maxLength) => {

      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      } else {
        return text;
      }
    }
  }


  initializeNotificationFunctions();
  initializeCommonUseFunctions();
  initializeModals();
  // verifyUserSession()

  const notificationDrawerRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let storedUser;
    try {
      storedUser = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_USER_DATA)
      );
      setUser(storedUser);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router> {/* Add the Router component here */}
        {/* <ComponentWrapper setShowNotifications={setShowNotifications} /> */}
        <CustomConfirmModal ref={confirmationModalRef} />
        {user && (
          <NotificationsDrawer
            ref={notificationDrawerRef}
            setShowNotifications={setShowNotifications}
            showNotifications={showNotifications}
            history={history}
          />
        )}
        <SnackbarWrapper ref={notificationRef} />
        <App setShowNotifications={setShowNotifications} showNotifications={showNotifications} />
      </Router>
    </ThemeProvider>
  );
}

export default ThemeWrapper;
