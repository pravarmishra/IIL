import Login from "../views/Login/index.js";
import Dashboard from "../views/Dashboard/index.js";
import CategoryPage from "../views/categoryManagement/index.js"
import FarmerManagement from "../views/farmerManagement/index.js"
import RetailerManagement from "../views/retailerManagement/index.js";
import DistributorManagement from "../views/distributorManagement/index.js";
import AgriExpertManagement from "../views/agriExpertManagement/index.js";
import FarmerVisit from "../views/farmerVisits/index.js";
import RetailerVisit from "../views/retailerVisits/index.js";
import DistributorVisit from "../views/distributorVisits/index.js";
import VanCampaign from "../views/vanCampaign/index.js";
import SpotDemo from "../views/spotDemo/index.js";
import NormalDemo from "../views/normalDemo/index.js";
import LpdDemoActivity from "../views/lpdDemoActivity/index.js";
import FarmerMeet from "../views/farmerMeet/index.js";
import KvkVisit from "../views/kvkVisit/index.js";
import KrishiMela from "../views/krishiMela/index.js";
import FeedbackReport from "../views/feedbackReport/index.js";
import TestDashboard from "../views/testDashboard/index.js";
import MappingManager from "../views/mappingManagement/index.js";
import VisitManager from "../views/visitManagement/index.js";
import EventManager from "../views/eventManagement/index.js";
import OrderManagement from "../views/orderManagement/index.js";

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
            path: "/farmermapping",
            name: "Farmer Management",
            component: FarmerManagement,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/retailermapping",
            name: "Reatailer Mapping",
            component: RetailerManagement,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/distributormapping",
            name: "Reatailer Mapping",
            component: DistributorManagement,
             hideNavBar:false,
            //  nodeRef: createRef(),
        }, {
            path: "/agriexpertmapping",
            name: "Agri-Expert Mapping",
            component: AgriExpertManagement,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/farmervisit",
            name: "Farmer Visits",
            component: FarmerVisit,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/retailervisit",
            name: "Retailer Visits",
            component: RetailerVisit,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/distributorvisit",
            name: "Distributor Visits",
            component: DistributorVisit,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/vancampaign",
            name: "Van Campaign",
            component: VanCampaign,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
         {
            path: "/spotDemo",
            name: "Spot Demo ",
            component: SpotDemo,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/normalDemo",
            name: "Normal Demo ",
            component: NormalDemo,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/lpdActivity",
            name: "LPD Activity ",
            component: LpdDemoActivity,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/farmermeet",
            name: "Farmer Meet ",
            component: FarmerMeet,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/kvkvisit",
            name: "KVK Visit",
            component: KvkVisit,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/krishimela",
            name: "Krishi Mela",
            component: KrishiMela,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/feedbackreport",
            name: "Feedback Report",
            component: FeedbackReport,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/testDashboard",
            name: "Feedback Report",
            component: TestDashboard,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/mappingreport",
            name: "Mapping Report",
            component: MappingManager,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/visitreport",
            name: "Visit Report",
            component: VisitManager,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/eventreport",
            name: "Visit Report",
            component: EventManager,
             hideNavBar:false,
            //  nodeRef: createRef(),
        },
        {
            path: "/orderreport",
            name: "Order Report",
            component: OrderManagement,
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
