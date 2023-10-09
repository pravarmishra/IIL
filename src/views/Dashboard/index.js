import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Drawer from "../../components/common/drawer/drawer";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import { ROLES } from "../../constants";
import ManageAccounts from "@mui/icons-material/ManageAccounts";

import {
  AddCircle,
  Cancel,
  ChargingStationRounded,
  ClearAll,
  Dvr,
  Email,
  Engineering,
  EventBusy,
  ListAltSharp,
  ManageAccountsOutlined,
  ManageHistory,
  ManageSearch,
  ManageSearchRounded,
  ManageSearchSharp,
  ManageSearchTwoTone,
  Money,
  PriceCheck,
  Receipt,
  SearchTwoTone,
  Sell,
  Timeline,
  TrackChanges,
  Warehouse,
} from "@mui/icons-material";
import { AuthContext } from "../../components/contextAPI/ContextAPI";
// import AppCurrentVisits from "./chart";
// import AppWebsiteVisits from "./chart";
import { Box, Icon, Stack } from "@mui/material";
import CabinIcon from "@mui/icons-material/Cabin";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import OpenInNewOffIcon from "@mui/icons-material/OpenInNewOff";
import ApexChart from "./chart";
import OpaqueLoading from "../../components/opaqueLoading/opaqueLoading";

const isMobile = window.innerWidth < 900;
const StyledCardHeading1 = ({ icon, children, value, sx, bgColor }) => (
  <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
    <Icon
      sx={{
        color: "#ffffff",
        background: bgColor,
        width: "38px",
        height: "38px",
        fontSize: 24,
        marginRight: 2,
        padding: "7px",
        borderRadius: "5px",
      }}
    >
      {icon}
    </Icon>
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* <Typography variant="h6" sx={{ fontSize:"12px" }}>
        {children}
      </Typography> */}
      <StyledCardHeading variant="h6" align="center" sx={{ fontSize: "12px" }}>
        {children}
      </StyledCardHeading>
      <Typography variant="h6" align="left" sx={{ marginTop: "0px" }}>
        <strong>{value}</strong>
      </Typography>
    </Box>
  </Box>
);
const HoverEffectDiv = styled.div`
  width:${isMobile ? '90%' : '45%'};
  // maxWidth:${isMobile ? '90%' : '70%'};

  padding: 5px;
  border-radius: 10px;
  background: white;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.04);
    transition: transform 0.2s;
  }
`;

const ShortcutCard = styled(Card)`
  width: 250px;
  height: 200px;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 0px;

  &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`;
const GraphCard = styled(Card)`
  width: ${isMobile ? "95%" : "50%"};
  margin-left: ${isMobile ? "0%" : "27px"};
  height: 300px;
  padding: ${isMobile ? "10px" : "0px"};
`;

const DetailCard = styled(Card)`
  width: ${isMobile ? "95%" : "39%"};
  height: 300px;
  display: ${isMobile ? "flex" : "grid"};
  flex-direction: ${isMobile && "column"};
  grid-template-columns: repeat(2, 1fr); 
  align-items: ${isMobile ? "left" : "center"};
  justify-items: ${isMobile ? "left" : "center"};
  &:nth-last-child(-n + 5) {
    grid-column: 1 / span 2; /* Display in a single row */
    /* Adjust the width, height, or any other styles as needed */
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 20px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardHeaderContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledCardHeading = styled(Typography)`
  text-transform: none;
  letter-spacing: 0.5px;
`;

const CardIcon = styled(ManageAccounts)`
  font-size: 112px;
  color:#85c225;
`;

const ContentContainer = styled.div`
  padding: 20px;
  // position: ${isMobile ? "relative" : "fixed"};
  top: 64px;
  left: ${isMobile ? `0px` : `240px`};
  width: ${isMobile ? `100%` : `calc(100% - 24px)`};
  ${!isMobile && `max-height: calc(100% - 64px);`}
  overflow-y: auto;
  display: flex;
  flex-direction: ${isMobile ? "column" : "row"};
  gap: 20px;
  ${isMobile && `align-items:center;`}
  flex-wrap:wrap;
`;

const Dashboard = (props) => {
  const [soInHouse, setSoInHouse] = useState(0);
  const [pendingDelivery, setPendingDelivery] = useState(0);
  const [expectingDelivery, setExpectingDelivery] = useState(0);
  const [containerPlanned, setContainerPlanned] = useState(0);
  const [containerUnplanned, setContainerUnplanned] = useState(0);
  const [country, setCountry] = useState(false);


  const { auth, setAuth } = useContext(AuthContext);
  let test = [];
  test = auth?.permissions?.filter((val) => val.role === auth.user.role)[0];
  const [isPageLoaded, setPageLoaded] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [deliveryPendingtoCustomer, setDeliveryPendingtoCustomer] = useState(0)
  const [delivered,setDelivered]=useState(false);
  const [navBar,setNavBar] = useState(false);
  // Add an event listener to the window object

console.log("PROPSSSSS",props)
// console.log("NAVBAR",props)

  const fetchData = async (id) => {
    // console.log(statusInventory, selectedTab)
    try {
      setLoading(true);
      let results = await window.Platform.database.fetchWarehouse(id);
      // console.log("rrr", results);
      if (results.attributes.warehouseCountry === "India") {
        setCountry(true);

      }
      setDeliveryPendingtoCustomer(results.attributes.pendingDeliveryToCustomer)
      setDelivered(results.attributes.soDelivered)
    
        setPendingDelivery(results.attributes.pendingDelivery)
      // setPendingDelivery(results.attributes.pendingDelivery);
      setSoInHouse(results.attributes.soInHouse);
      setExpectingDelivery(results.attributes.expectingDelivery);
      // setContainerPlanned(results.attributes.containerPlanned)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const getInviteId = () => {
  //   if( test && test?.['warehouse management']?.read)
  //   {

  //     // console.log("authVal",test?.['warehouse management'])
  //   let queryParams = "";
  //   try {
  //     const url = new URL(window.location.href);

  //     queryParams = url.search.toString().slice(1);
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   return queryParams;
  // }
  // };

  const getInviteId = () => {
    if (test && test?.["warehouse management"]?.read) {
      let queryParams = "";
      try {
        const url = new URL(window.location.href);
        queryParams = url.searchParams.get("warehouseId"); // Get the value of the "warehouseId" parameter
      } catch (e) {
        console.error(e);
      }
      return queryParams;
    }
  };

  // let id = getInviteId();
  let id = getInviteId();
  useEffect(() => {
    // console.log("iddd", props.user?.warehouse.objectId);
    if (id || props.user?.warehouse?.objectId) {
      fetchData(id || props.user?.warehouse?.objectId);
      // console.log("id is present", id);
    }
  }, [location]);

  useEffect(() => {
    const isLoadedFromStorage = localStorage.getItem("isPageLoaded");
    if (!isLoadedFromStorage) {
      setPageLoaded(true);
      localStorage.setItem("isPageLoaded", true);
      window.location.reload();
    } else {
      setTimeout(() => {
        const isLoggedSuccessMessageShown = localStorage.getItem(
          "isLoggedSuccessMessageShown"
        );
        if (!isLoggedSuccessMessageShown) {
          window.NotificationUtils.showSuccess("Logged in successfully");
          localStorage.setItem("isLoggedSuccessMessageShown", true);
        }
      }, 1000);
    }
  }, []);

  //   useEffect(() => {
  //     // if(auth.permissions)

  //     console.log("dash", auth?.permissions);
  // console.log("test",test && test['quotation generation']?.read?[auth.user.role] : [])
  // console.log("test",test)
  // // console.log("val",test['quotation generation']?.read[auth.user.role] )
  //   }, [auth]);
  console.log('tesssst', props?.user?.profile__c)
  const access=["category"]

  const cardData = [
    {
      title: "Category Data",
      icon: ManageAccounts,
      link: "/category",
      role: ["SI"],
    },{
      title: "Farmer Mapping",
      icon: ManageAccounts,
      link: "/farmermapping",
      role: ["SI"],
    },
    // {
    //   title: "Category Data",
    //   icon: ManageAccounts,
    //   link: "/category",
    //   role: ["SI"],
    // },{
    //   title: "Category Data",
    //   icon: ManageAccounts,
    //   link: "/category",
    //   role: ["SI"],
    // },
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
  // const chartData = country?
  // {
  //   totalSOInHouse: soInHouse===0?0:+soInHouse, // Replace with actual data
  //   totalPending: pendingDelivery===0?0:+pendingDelivery, // Replace with actual data
  //   expectingDelivery: expectingDelivery===0?0:+expectingDelivery, // Replace with actual data
  //   Delivered: delivered===0?0:+delivered, // Replace with actual data
  //   DeliveryPendingtoCustomer: deliveryPendingtoCustomer===0?0:+deliveryPendingtoCustomer, // Replace with actual data
  // }:{
  //   totalSOInHouse: soInHouse===0?0:+soInHouse, // Replace with actual data
  //   totalPending: pendingDelivery===0?0:+pendingDelivery, // Replace with actual data
  //   expectingDelivery: expectingDelivery===0?0:+expectingDelivery, // Replace with actual data
  //   Delivered: delivered===0?0:+delivered,
  //   // containerUnplanned: 2,
  // };

  //  const chartData = country?
  // {
  //   totalSOInHouse: 0, // Replace with actual data
  //   totalPending: 0, // Replace with actual data
  //   expectingDelivery: 0, // Replace with actual data
  //   Delivered: 0,
  //   DeliveryPendingtoCustomer: 0,
  // }:{
  //   totalSOInHouse: 0, // Replace with actual data
  //   totalPending: 0, // Replace with actual data
  //   expectingDelivery: 0, // Replace with actual data
  //   Delivered: 0,
  //   containerUnplanned: 2,
  // };
  

  // console.log("Container");

  const renderCards = () => {
    const filteredCards = cardData.filter((card) =>
{
      return card.role.includes( props?.user?.profile__c)}
    );
    // console.log('ffff', filteredCards)

    return filteredCards.map((card, index) => (
      <ShortcutCard key={index} sx={{ borderRadius: "20px" }}>
        <NavLink to={card.link}>
          <StyledCardContent>
            <CardHeaderContainer>
              <StyledCardHeading variant="h6" align="center">
                {card.title}
              </StyledCardHeading>
            </CardHeaderContainer>
            <CardIcon as={card.icon} sx={{ fontSize: "112px" }} />
          </StyledCardContent>
        </NavLink>
      </ShortcutCard>
    ));
  };

  return (
    <div
      style={{
        background: "#EEEEEE",
        minHeight: "100vh",
        maxHeight: "100vh",
        overflowY: "scroll",
      }}
    >
      <CssBaseline />
      {loading && <OpaqueLoading/>}

      <Drawer props={props}>
       

        <ContentContainer>
        { renderCards()}
                    {/* {id && renderCards()} */}
                    {/* {(props.user?.warehouse?.objectId && !id) && renderCards()} */}
        </ContentContainer>
      </Drawer>
    </div>
  );
};

export default Dashboard;


