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
import BallotIcon from "@mui/icons-material/Ballot";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import FactoryIcon from '@mui/icons-material/Factory';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import StreetviewIcon from '@mui/icons-material/Streetview';
import Groups3Icon from '@mui/icons-material/Groups3';

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
import { Box, Button, Icon, MenuItem, Stack, TextField } from "@mui/material";
import CabinIcon from "@mui/icons-material/Cabin";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import OpenInNewOffIcon from "@mui/icons-material/OpenInNewOff";
import OpaqueLoading from "../../components/opaqueLoading/opaqueLoading";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PieChart from "../Dashboard/visitChart";
import EventChart from "../Dashboard/eventChart";
import ApexChart from "../Dashboard/chart";
import { ReactComponent as FarmerMapping } from "../../icons/Farmer Mapping.svg"
import { ReactComponent as RetailerMapping } from "../../icons/Retailer Mapping.svg"
import { ReactComponent as DistributorMapping } from "../../icons/Distributor Mapping.svg"
import { ReactComponent as AgriExpertMapping } from "../../icons/Agri Expert Mapping.svg"
import { ReactComponent as farmervisit } from "../../icons/Farmer visit.svg"
import { ReactComponent as Retailervisit } from "../../icons/Retailer visit.svg"
import { ReactComponent as Distributorvisit } from "../../icons/Distributor visit.svg"
import { ReactComponent as vanCampaign } from "../../icons/Van Campaign.svg"
import { ReactComponent as spotDemo } from "../../icons/Spot demo.svg"
import { ReactComponent as NormalDemo } from "../../icons/Normal demo.svg"
import { ReactComponent as LpdDemo } from "../../icons/Large plot demo.svg"
import { ReactComponent as FarmerMeet } from "../../icons/Farmer Meet.svg"
import { ReactComponent as Kvkvisit } from "../../icons/kvkvisit.svg"
import { ReactComponent as KrishiMela } from "../../icons/krishimela.svg"
import { ReactComponent as Feedback } from "../../icons/Feedback.svg"















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
  width: ${isMobile ? "90%" : "45%"};
  // maxWidth:${isMobile ? "90%" : "70%"};

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
  margin-left: ${isMobile ? "5px" : "0px"};
  height:${isMobile ? "285px" : "290px"}; 
  padding: ${isMobile ? "10px" : "5px"};
`;

const GraphCard1 = styled(Card)`
  width: ${isMobile ? "95%" : "50%"};
  margin-left: ${isMobile ? "5px" : "0px"};
  height:${isMobile ? "315px" : "290px"}; 
  padding: ${isMobile ? "10px" : "5px"};
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
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${isMobile ? "flex-start" : "space-between"};
  margin-bottom: 10px;
  flex-direction: ${isMobile ? "column" : "row"};
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
  color: #85c225;
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

const TestDashboard = (props) => {
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
 
  const [ytdFilter, setYtdFilter] = useState(false);
  const [mtdFilter, setmtdFilter] = useState(false);
  const [ftdFilter, setFtdFilter] = useState(false);
  const [cumalativeFilter, setCumalativeFilter] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [territoryFilter, setTerritoryFilter] = useState(null);
  const [territoryType, setTerritoryType] = useState([]);
  const [territoryOptions, setTerritoryOptions] = useState([]);
  const [selectedTeritoryType, setSelectedTerritoryType] = useState(null);
  const [dateRange1, setDateRange1] = useState(false);
  // const [dateRange2,setDateRange2]=useState('')
  const [startDate1, setStartDate1] = useState();
  const [endDate1, setEndDate1] = useState();
  const [mappingData,setMappingData] = useState()
  const [visitData,setVisitedData] = useState()
  const [eventData,setEventData] = useState()
  const [minDate,setMinDate]=useState()

  console.log("PROPSSSSS", props);
  // console.log("NAVBAR",props)

  const fetchData = async (id) => {
    // console.log(statusInventory, selectedTab)
    try {
      setLoading(true);
      setMappingData()
      // setData([]);
      setYtdFilter(false)
      setmtdFilter(false)
      setFtdFilter(false)
      setStartDate()
      setEndDate()
      setTerritoryFilter()
      setDateRange1(false)
      let results = await window.Platform.database.getMappingDetailsCount();
      console.log("rrr", results);
      setMappingData(results?.data);
      setVisitedData(results?.count);
      setEventData(results?.details)
      const resultMap = {};
      results?.region?.forEach((item) => {
        const territoryMapping = item.name;
        const subDistrictName = item.sub_district_name__c;

        if (!resultMap[territoryMapping]) {
          resultMap[territoryMapping] = [];
        }

        resultMap[territoryMapping].push(subDistrictName);
      });

      const resultArray = [];

      for (const territoryMapping in resultMap) {
        resultArray.push({
          territory_mapping1__c: territoryMapping,
          sub_district_name__c: resultMap[territoryMapping],
        });
      }

      console.log(resultArray);

      setTerritoryType(resultArray);

      // setContainerPlanned(results.attributes.containerPlanned)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

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


  console.log("tesssst", props?.user?.profile__c);
  const access = ["category"];

  const cardData = [
    {
      title: "Category Data",
      icon: BallotIcon,
      link: "/category",
      role: ["SI","AM"],
    },
    {
      title: "Farmer Mapping",
      icon: FarmerMapping,
  
      link: "/farmermapping",
      role: ["SI","AM"],
    },
    {
      title: "Retailer Mapping",
      icon: RetailerMapping,
      link: "/retailermapping",
      role: ["SI","AM"],
    },
    {
      title: "Distributor Mapping",
      icon: DistributorMapping,
      link: "/distributormapping",
      role: ["SI","AM"],
    },
    {
      title: "Agri-Expert Mapping",
      icon: AgriExpertMapping,
      link: "/agriexpertmapping",
      role: ["SI","AM"],
    },
   

    {
      link: "/farmervisit",
      title: "Farmer Visit",
      icon: farmervisit,
      role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
  {
    link: "/retailervisit",
    title: "Retailer Visits",
    icon: Retailervisit,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
  {
    link: "/distributorvisit",
    title: "Distributor Visits",
    icon: Distributorvisit,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
  {
    link: "/vancampaign",
    title: "Van Campaign",
      icon: vanCampaign,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
   {
    link: "/spotDemo",
      title: "Spot Demo ",
      icon: spotDemo,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
  {
    link: "/normalDemo",
    title: "Normal Demo ",
      icon: NormalDemo,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
  {
    link: "/lpdActivity",
      title: "Large Plot Demo",
      icon: LpdDemo,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
  {
    link: "/farmermeet",
    title: "Farmer Meet ",
    icon: FarmerMeet,
     role: ["SI","AM"],
    //  nodeRef: createRef(),
},
{
    link: "/kvkvisit",
    title: "KVK Visit",
    icon: Kvkvisit,
     role: ["SI","AM"],
    //  nodeRef: createRef(),
},
{
    link: "/krishimela",
    title: "Krishi Mela",
    icon: KrishiMela,
     role: ["SI","AM"],
    //  nodeRef: createRef(),
},
{
  link: "/feedbackreport",
  title: "Feedback Report",
  icon: Feedback,
  role: ["SI","AM"],
  //  nodeRef: createRef(),
},
  ];


  const renderCards = () => {
    const filteredCards = cardData.filter((card) => {
      return card.role.includes(props?.user?.profile__c);
    });
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

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  // console.log("CurrentPage",paginationModel.page)

  const YTD=async()=>{
    try{
setYtdFilter(true)
setmtdFilter(false)
setFtdFilter(false)
setCumalativeFilter(false)
setLoading(true)

    const today = new Date();
const startOfYear = new Date(today.getFullYear(), 0, 1); 

const formattedStartDate = formatDateToYYYYMMDD(startOfYear);
const formattedCurrentDate = formatDateToYYYYMMDD(today);

console.log("Start of Current Year:", formattedStartDate);
setStartDate(formattedStartDate)
console.log("Current Date:", formattedCurrentDate);
setEndDate(formattedCurrentDate)
if(territoryFilter){
console.log("Current Date:check1");

  const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:formattedStartDate,endDate:formattedCurrentDate,territoryName:territoryFilter })
  setMappingData(response?.data)
  setVisitedData(response?.count);
  setEventData(response?.region)


  // setData(response.items);
  // setRowCount(response.count[0].count)  
}else{
console.log("Current Date:check2");

  const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:formattedStartDate,endDate:formattedCurrentDate })

  setMappingData(response?.data)
  setVisitedData(response?.count)
  setEventData(response?.region)

     
  }
  setLoading(false)
}
catch(err){
  console.log(err);
  setYtdFilter(false)
  window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again");
  setLoading(false)
  fetchData()
}
  
  }
const MTD=async()=>{
  try{
    setmtdFilter(true)
    setYtdFilter(false)
    setFtdFilter(false)
    setCumalativeFilter(false)
    setLoading(true)
  const today = new Date();
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

const formattedStartOfMonth = formatDateToYYYYMMDD(startOfMonth);
const formattedCurrentDate = formatDateToYYYYMMDD(today);

console.log("Start of Current Month:", formattedStartOfMonth);
setStartDate(formattedStartOfMonth)
console.log("Current Date:", formattedCurrentDate);
setEndDate(formattedCurrentDate)
if(territoryFilter){
  const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:formattedStartOfMonth,endDate:formattedCurrentDate,territoryName:territoryFilter })
  setMappingData(response?.data)
  setVisitedData(response?.count);
  setEventData(response?.region)


}else{
  const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:formattedStartOfMonth,endDate:formattedCurrentDate})
  setMappingData(response?.data)
  setVisitedData(response?.count);
  setEventData(response?.region)


  }
  setLoading(false)
}
catch(err){
  console.log(err);
  setmtdFilter(false)
  setLoading(false)
  window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again")
  fetchData()
}
}
const FTD=async()=>{
  try{
    setFtdFilter(true)
    setmtdFilter(false)
    setYtdFilter(false)
    setCumalativeFilter(false)
    setLoading(true)
  const today = new Date();

const formattedCurrentDate = formatDateToYYYYMMDD(today);
console.log("FPRMATTEDDATE",formattedCurrentDate)
setStartDate(formattedCurrentDate)

console.log("Current Date:", formattedCurrentDate);
if(territoryFilter){
const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:formattedCurrentDate,territoryName:territoryFilter })
      setMappingData(response.data)
      setVisitedData(response?.count);
  setEventData(response?.region)


     
}else{
const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:formattedCurrentDate })
setMappingData(response.data)
setVisitedData(response?.count);
setEventData(response?.region)


      
}
console.log("Response")
setLoading(false)
  }
  catch(err){
    console.log(err)
    setLoading(false)
    window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again");

    setFtdFilter(false)
    fetchData()
  }
}

const fetchTerritoryFilter=async(data)=>{
try{
  setLoading(true)

  // console.log("SEARCH",searchTerm)
  if(startDate||endDate){
    console.log("CHECKFILTER1")
  const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:startDate,endDate:endDate,territoryName:data })
  setMappingData(response.data) 
  setVisitedData(response?.count);
  setEventData(response?.region)


}
  else{
    console.log("CHECKFILTER2")

  const response = await window.Platform.database.getMappingDetailsCountFilter({territoryName:data })
  setMappingData(response.data)
  setVisitedData(response?.count);
  setEventData(response?.region)


  }
  setLoading(false)
}
catch(err){
  console.log(err)
  setLoading(false)
  window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again");
  fetchData()

}
}
const formatDate=async(data)=>{
  setMinDate(data)
  setDateRange1(true)
  setEndDate1(null)
  setEndDate(null)
  const datePickerResponse = new Date(data.$d);

const year = datePickerResponse.getFullYear();
const month = String(datePickerResponse.getMonth() + 1).padStart(2, '0');
const day = String(datePickerResponse.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

setStartDate1(formattedDate)
setStartDate(formattedDate)
console.log("CHECK!!")
console.log("CHECKENDDATE",endDate)



}
const finalDateRangeFilter=async(data)=>{
  try{
    setLoading(true)
    
  const datePickerResponse = new Date(data);

  const year = datePickerResponse.getFullYear();
  const month = String(datePickerResponse.getMonth() + 1).padStart(2, '0');
  const day = String(datePickerResponse.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}/${month}/${day}`;
  if (data){
  setEndDate(formattedDate)
  setEndDate1(formattedDate)
}
    if(territoryFilter){
    const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:startDate,endDate:data?formattedDate:endDate,territoryName:territoryFilter })
    setMappingData(response.data) 
  setVisitedData(response?.count);
  setEventData(response?.region)


  }
    else{
    const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:startDate,endDate:data?formattedDate:endDate})
    setMappingData(response.data) 
  setVisitedData(response?.count);
  setEventData(response?.region)


    }
    setLoading(false)

  }
  catch(err){
    console.log(err)
    setLoading(false)
    window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again");

    fetchData()
  
  }
}

const clearDateFilter=async()=>{
  setStartDate(null)
  setEndDate(null)
  setStartDate1(null)
  setEndDate1(null)
  setDateRange1(false)
  if(territoryFilter){
    try{
    setLoading(true)
    const response = await window.Platform.database.getMappingDetailsCountFilter({territoryName:territoryFilter })
    const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
    setMappingData(response.data)
  setVisitedData(response?.count);
  setEventData(response?.region)


    setLoading(false)
  }
  catch(e){
    console.log(e)
    window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again");
    fetchData()  

    }
  }
else{
  fetchData()
}
}

const clearTerritoryFIlter=async()=>{
  setTerritoryFilter(null)
  setSelectedTerritoryType(null)
  setTerritoryOptions(null)
  console.log(territoryFilter,selectedTeritoryType)
  if(startDate||endDate){
    try{
    setLoading(true)
    const response = await window.Platform.database.getMappingDetailsCountFilter({startDate:startDate,endDate:endDate,territoryName:'' })
   setMappingData(response.data)
  setVisitedData(response?.count);
  setEventData(response?.region)


    setLoading(false)
  }
  catch(e){
    console.log(e)
    window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again");
    fetchData()  

    }
  }
else{
  fetchData()
}


}
const CumulativeFiltefunctionr=async()=>{
  try{
    setLoading(true)
    setStartDate(null)
    setEndDate(null)
    setYtdFilter(false)
setmtdFilter(false)
setFtdFilter(false)
setCumalativeFilter(true)
// setLoading(true)
    if(territoryFilter)
  {
    const response = await window.Platform.database.getMappingDetailsCountFilter({territoryName:territoryFilter })
    const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
   setMappingData(response.data)
  setVisitedData(response?.count);
  setEventData(response?.region)


    setLoading(false)
  }
  else{
    fetchData()
  }
}
catch(e){
  console.log(e)
  fetchData()
  setLoading(false)

}
}

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
      {loading && <OpaqueLoading />}

      <Drawer props={props}>
        <ContentContainer>
             <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: isMobile?"10px":"20px",
              paddingTop: "4px",
              justifyContent: "center",
            }}
          >
            <TextField
              id="outlined-select-currency"
              select
              label={isMobile ? "Territory Type" : "Select Territory Type"}
              style={{ width: isMobile ? "52%" : "20%" }}
              // defaultValue="EUR"
              // helperText="Please select your currency"
              value={selectedTeritoryType}
              onChange={async (event, value) => {
                console.log("Autocomplete", event?.target?.value);
                setSelectedTerritoryType(event?.target?.value);
                let filterData = territoryType?.filter(
                  (select) =>
                    select.territory_mapping1__c === event?.target?.value
                );
                console.log("Autocomplete", filterData);
                setTerritoryOptions(filterData[0].sub_district_name__c);
              }}
            >
              {territoryType?.map((option) => (
                <MenuItem
                  key={option.territory_mapping1__c}
                  value={option.territory_mapping1__c}
                >
                  {option.territory_mapping1__c}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Select Territory"
              style={{ width: isMobile ? "52%" : "25%" }}
              // defaultValue="EUR"
              // helperText="Please select your currency"
              value={territoryFilter}
              disabled={!territoryOptions?.length || loading}
              onChange={async (event, value) => {
                console.log("valueAuto", event?.target?.value);
                setTerritoryFilter(event?.target?.value);
                fetchTerritoryFilter(event?.target?.value)
              }}
            >
              {territoryOptions &&
                territoryOptions?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>

            <Button
              variant="contained"
              disabled={!territoryOptions || loading}
              onClick={()=>clearTerritoryFIlter()}
            >
              Clear
            </Button>
          </div>
          <Stack
            direction={isMobile ? "column" : "row"}
            sx={{
              // marginLeft: isMobile && "1%",
              marginTop: "10px",
              width: "100%",
              justifyContent: "center",
            }}
            spacing={isMobile ? 3 : 8}
          >
            <Stack direction="row" spacing={2}>
            <Button variant="contained" disabled={ytdFilter||dateRange1||loading} onClick={()=>YTD()}>YTD</Button>
            <Button variant="contained" disabled={mtdFilter ||dateRange1||loading} onClick={()=>MTD()}>MTD</Button>
            <Button variant="contained" disabled={ftdFilter ||dateRange1||loading} onClick={()=>FTD()} >FTD</Button>
            <Button variant="contained" disabled={cumalativeFilter ||dateRange1||loading} onClick={()=>CumulativeFiltefunctionr()}>Cumulative</Button>

            </Stack>
            <Stack direction="row" spacing={1} width={isMobile?324:500}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Start Date" value={startDate1} disabled={ftdFilter||mtdFilter||ytdFilter||loading} format="YYYY/MM/DD" onChange={(data)=>formatDate(data)} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="End Date"  minDate={minDate} value={endDate1} disabled={ftdFilter||mtdFilter||ytdFilter||!dateRange1||loading} format="YYYY/MM/DD" onChange={(data)=>finalDateRangeFilter(data.$d)} />
            </LocalizationProvider>
            <Button variant="contained" onClick={()=>clearDateFilter()} disabled={!dateRange1||loading} >Clear</Button>
            </Stack>
          </Stack>
          <Stack
            direction={isMobile ? "column" : "row"}
            sx={{
              // marginLeft: isMobile && "1%",
              marginTop: "10px",
              width: "100%",
              justifyContent: "center",
            }}
            spacing={isMobile ? 3 : 3}
          >
            <GraphCard
              sx={{
                borderRadius: "20px",
                width: isMobile ? "95%" : "28%",
                
              }}
            > 
                 <ApexChart data={mappingData} />
            </GraphCard>
            <GraphCard
              sx={{
                borderRadius: "20px",
                width: isMobile ? "95%" : "28%",
                
              }}
            > 
                 <PieChart  data={visitData} /> 
            </GraphCard>
            <GraphCard1
              sx={{
                borderRadius: "20px",
                width: isMobile ? "95%" : "28%",
          
                
              }}
            > 
                 <EventChart  data={eventData} /> 
            </GraphCard1>
          
          </Stack>   
          {renderCards()}
          {/* {id && renderCards()} */}
          {/* {(props.user?.warehouse?.objectId && !id) && renderCards()} */}
        </ContentContainer>
      </Drawer>
    </div>
  );
};

export default TestDashboard;
