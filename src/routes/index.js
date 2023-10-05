import Login from "../views/Login/index.js";
import Dashboard from "../views/Dashboard/index.js";
import CategoryPage from "../views/categoryManagement/index.js"
import FarmerManagement from "../views/farmerManagement/index.js"
// import { createBrowserRouter } from "react-router-dom";
// import UserManagement from "../views/UserManagement/index.js";
// import PrivateRoute from "../components/PrivateRoutes/index.js";
// // import Invite from "../views/invite/";
// import { AuthContext } from "../components/contextAPI/ContextAPI.js";
// import Tracking from "../views/Tracking/index.js";
// import AccessManagement from "../views/AccessManagement/index.js";
// import QuotationGeneration from "../views/QuotationGeneration/index.js";
// import SoGeneration from "../views/SoGeneration/index.js";
// import Billing from "../views/Billing/index.js";
// import { createRef } from "react";
// import QuotationGenerate from "../views/QuotationGeneration/QuotationGenerate.js";
// import WarehouseManagement from "../views/WarehouseManagement/index.js";
// import Invite from "../views/invite/index.js";
// import WarehouseInventory from "../views/WarehouseManagement/warehouseInventory.js";
// import Timeline from "../views/CalenderTimeline/Timeline.js";
// import PackagingListsByAir from "../views/PackagingLists/PackagingListByAir.js";
// import PackagingListsBySea from "../views/PackagingLists/PackagingListsBySea.js";
// import MasterManager from "../views/MasterManager/index.js";
// import StatesManager from "../views/StateManager/index.js";
// import CitiesManager from "../views/CitiesManager/index.js";
// import DistrictsManager from "../views/DistrictManager/index.js";
// import CustomerManager from "../views/CustomerManager/index.js";
// import ItemModal from "../components/modals/itemModal.js";
// import ItemsManager from "../views/ItemManager/index.js";
// import SupplierManager from "../views/SupplierManager/index.js";
// import { COMPONENTS } from "../constants.js";
// import QuotationCustomerApproval from "../views/QuotationCustomerApproval/index.js";
// import QuotationApprovalCustomer from "../views/QuotationApprovalCustomer.js/index.js";
// import ContainerPlanning from "../views/ContainerPlanning/index.js";
// import OrderManager from "../views/orderManagement/index.js";
// import ExpectingDelivery from "../views/WarehouseManagement/expectingDelivery.js";
// import SoInHouse from "../views/WarehouseManagement/soInHouse.js";
// import ContainerUnplanned from "../views/WarehouseManagement/containerUnplanned.js";
// import PendingDelivery from "../views/WarehouseManagement/pendingDelivery.js";
// import containerPlanned from "../views/WarehouseManagement/containerPlanned.js";
// import PendingdeliverytoCustomer from "../views/WarehouseManagement/deliveryPendingtoCustomer.js";
// import Delivered from "../views/WarehouseManagement/delivered.js";
// import QuotationHistory from "../views/QuotationGeneration/quotationHistory.js";
// import CustomClearance from "../views/CustomClearance/index.js";
// import TallyCheck from "../views/TallyCheck/index.js";
// import DeclarationAndPayment from "../views/DeclarationAndPayment/index.js";
// import InventoryDashboard from "../views/WarehouseManagement/inventoryDashboard.js";

// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: 
//           <Dashboard/>
    
    
//     },
//     {
//         path: "/login",
//         element: <Login />,
//         redirect: AuthContext,
//         pathTo: "/",
//     }
//     ,{
//         path: "/usermanagement",
//         element: <PrivateRoute><UserManagement/></PrivateRoute>
//     }

//   ]);

// export default router;

function routes(loggedIn, user){
    return[
        {
            path: "/login",
            name: "Login",
            component: Login,
            redirect: user,
            pathTo: "/dashboard",
            hideNavBar:true,
            // nodeRef: createRef(),
        },
       
        {
            redirect: loggedIn === false,
            path: "*",
            pathTo: "/login",
        },

        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard,
             hideNavBar:true,
            //  nodeRef: createRef(),
        },
        {
            path: "/category",
            name: "Category",
            component: CategoryPage,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/farmermanagement",
            name: "Farmer Management",
            component: FarmerManagement,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
      
        
    ]
}

export default routes;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "../views/Login/index.js";
// import Dashboard from "../views/Dashboard/index.js";
// import UserManagement from "../views/UserManagement/index.js";
// import PrivateRoute from "../components/PrivateRoutes/index.js";

// const RouterComponent = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <Dashboard /> 
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/usermanagement"
//           element={<PrivateRoute><UserManagement/></PrivateRoute>}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default RouterComponent;




// import Login from "../views/Login/index.js";
// import Dashboard from "../views/Dashboard/index.js";
// import { createBrowserRouter, useRoutes } from "react-router-dom";
// import UserManagement from "../views/UserManagement/index.js";
// import PrivateRoute from "../components/PrivateRoutes/index.js";
// // import Invite from "../views/invite/";


// // export default function Router() {
// //     const routes = useRoutes([
// //     {
// //       path: "/",
// //       element: <PrivateRoute>
// //           <Dashboard/>
// //         </PrivateRoute>
// //     },
// //     {
// //         path: "/login",
// //         element: <Login />,
// //         // redirect: user,
// //         pathTo: "/dashboard",
// //     }
// //     ,{
// //         path: "/usermanagement",
// //         element: <PrivateRoute><UserManagement/></PrivateRoute>
// //     }
//     // {
//     //   path: "/Login",
//     //   elem
//     // }
// // ]);

// // return routes;
// // }

// // import { Navigate, useRoutes } from 'react-router-dom';
// // // layouts
// // import DashboardLayout from './layouts/dashboard';
// // import SimpleLayout from './layouts/simple';
// // //
// // import BlogPage from './pages/BlogPage';
// // import ModuleManagement from './pages/DistributorOnboarding.js';
// // import LoginPage from './pages/LoginPage';
// // import Page404 from './pages/Page404';
// // import ProductsPage from './pages/ProductsPage';
// // import DashboardAppPage from './pages/DashboardAppPage';
// // import PrivateRoute from './components/private-routing/PrivateRoute';
// // import DepartmentRole from './pages/DepartmentRolePage';
// // import EmployeeOnboard from './pages/EmpoyeeOnboard';
// // import RetailorOnboard from './pages/RetailerOnboarding.';
// // import DistributorOnboard from './pages/DistributorOnboarding.js';

// // ----------------------------------------------------------------------

// export default function Router() {
//   const routes = useRoutes([
//     {
//       path: '/',
//       element: <Login />,
//     },
//     // {
//     //   path: '/dashboard',
//     //   element:<PrivateRoute> <DashboardLayout /> </PrivateRoute>,
//     //   children: [
//     //     { element: <Navigate to="/dashboard/app" />, index: true },
//     //     { path: 'app', element: <DashboardAppPage /> },
//     //     { path: 'onboard/distributor', element: <DistributorOnboard /> },
//     //     { path: 'onboard/retailor', element: <RetailorOnboard /> },
//     //     { path: 'module-management', element: <ModuleManagement /> },
//     //     { path: 'Empolyee-onboard', element: <EmployeeOnboard /> },
//     //     { path: 'products', element: <ProductsPage /> },
//     //     { path: 'blog', element: <BlogPage /> },
//     //     { path: '/dashboard/department-Role', element: <DepartmentRole/> },
//     //   ],
//     // },
//     // {
//     //   element: <SimpleLayout />,
//     //   children: [
//     //     { element: <Navigate to="/login" />, index: true },
//     //     { path: '404', element: <Page404 /> },
//     //     { path: '*', element: <Navigate to="/404" /> },
//     //   ],
//     // },
//     // {
//     //   path: '*',
//     //   element: <Navigate to="/404" replace />,
//     // },
//   ]);

//   return routes;
// }


// import React, { useState, useContext, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "../views/Login/index.js";
// import Dashboard from "../views/Dashboard/index.js";
// import UserManagement from "../views/UserManagement/index.js";
// import PrivateRoute from "../components/PrivateRoutes/index.js";
// import { AuthContext } from "../components/contextAPI/ContextAPI.js";


// const RouterComponent = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// const { auth, setAuth} = useContext(AuthContext)

// useEffect(() => {
// console.log("authValue",auth)
// }, [auth])

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <Dashboard /> 
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/usermanagement"
//           element={<PrivateRoute><UserManagement/></PrivateRoute>}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default RouterComponent;
