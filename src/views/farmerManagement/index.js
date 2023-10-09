import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  getGridStringOperators,
} from "@mui/x-data-grid";
import styled from "styled-components";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Drawer from "../../components/common/drawer/drawer";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import {
  Typography,
  Button,
  Fab,
  IconButton,
  Tabs,
  Tab,
  Icon,
  Stack,
  Autocomplete,
  TextField,
  Divider,
  MenuItem,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { SaveAlt } from "@mui/icons-material";
import { Check as CheckIcon, Clear as ClearIcon } from "@mui/icons-material";
import OpaqueLoading from "../../components/opaqueLoading/opaqueLoading";
import { DATE_FORMATS } from "../../constants";
import moment from "moment";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
import PreviewIcon from '@mui/icons-material/Preview';

import { DateField, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { set } from "date-fns";

const isMobile = window.innerWidth < 900;

const StaffEditorPageContainer = styled.div`
  height: ${isMobile ? `auto` : `calc(100vh - 80px)`};
  width: 100%;
  background-color: white;
  padding: 10px 15px;
  ${isMobile &&
  `
      position: relative;
  
      `}
`;
const DataGridContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  height: calc(100vh - 204px);
  && .highlighted-row {
    background-color: #ffcccb !important;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${isMobile ? "flex-start" : "space-between"};
  margin-bottom: 10px;
  flex-direction: ${isMobile ? "column" : "row"};
`;

const TableContainer = styled.div`
  height: calc(
    100vh - ${isMobile ? "56px - 20px - 82.23px" : "140px - 20px - 41.77px"}
  );
  width: 100%;
  border: solid 1px lightGrey;
  border-radius: 8px;
  overflow-x: ${isMobile
    ? "auto"
    : "hidden"}; /* Add horizontal scroll for mobile */
`;

const FabStyle = styled(Fab)`
  && {
    z-index: 1;
  }
`;
const StyledCardHeading = styled(Typography)`
  text-transform: none;
  letter-spacing: 0.5px;
`;



export default function FarmerManagement(props) {
  const [loading, setLoading] = useState(false);

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [data, setData] = useState([]);
  
  const [rowCount, setRowCount] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [paginationModel, setPaginationModel] = useState({
  page: currentPage - 1,
  pageSize: 7,
});
const [searchTerm, setSearchTerm]=useState('')
const optionTerritoryType=[{id:1,name:"T1"},{id:2,name:"T2"}]
const [ytdFilter,setYtdFilter]=useState(false)
const [mtdFilter,setmtdFilter]=useState(false)
const [ftdFilter,setFtdFilter]=useState(false)
const [cumalativeFilter,setCumalativeFilter]=useState(false)
const [startDate,setStartDate]=useState()
const [endDate,setEndDate]=useState()
const [territoryFilter,setTerritoryFilter]=useState()
const [territoryType,setTerritoryType]=useState([])
const [territoryOptions,setTerritoryOptions]=useState([])
const [selectedTeritoryType,setSelectedTerritoryType]=useState(null)
const [dateRange1,setDateRange1]=useState(false)
// const [dateRange2,setDateRange2]=useState('')
const [startDate1,setStartDate1]=useState()
const [endDate1,setEndDate1]=useState()



useEffect(() => {
  // console.log('check page', paginationModel)
  // if(searchTerm){
    onFilterChange1(searchTerm)
  // }

}, [paginationModel.page]);

useEffect(() => {
  // console.log('check page', paginationModel)
if(!searchTerm&&!startDate&&!endDate&&!territoryFilter){
fetchData()}
  // if(!queryOptions)
  // fetchData(activeTab);
}, [paginationModel.page]);





  const fetchData = async (details) => {
    try {
      setLoading(true);
      setData([]);
      setYtdFilter(false)
      setmtdFilter(false)
      setFtdFilter(false)
      setStartDate()
      setEndDate()
      setTerritoryFilter()
      setDateRange1(false)
      let results = await window.Platform.database.getFarmerMappingDetails({pageNumber:paginationModel.page});
      console.log("RESPONSE", results);
      const jsonArrayWithId = results?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
      setData(jsonArrayWithId)
      setRowCount(results.count[0].count)
      const territoryData=results?.region?.map((region,index)=>{
        let temp={id:index+1,name:region.name,territoryMapping:region.territory_mapping1__c}
     return temp
      })
      console.log("TestData",territoryData)
      setTerritoryType(territoryData)
      
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again");

    }
  };

  console.log("startDate",startDate)
  console.log("endDate",endDate)
  console.log("endDate",territoryFilter)

  const onFilterChange1 = async(filterModel) => {

    
    try{  
      setLoading(true);
      console.log(filterModel,'................................................................')
      if(filterModel){
      const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:filterModel.field,filterValue:filterModel.value,pageNumber:paginationModel.page,startDate:startDate,endDate:endDate,territoryName:territoryFilter })
      console.log("respponse",response);
      const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
      setData(jsonArrayWithId)
      setRowCount(response.count[0].count)
      }
      else{
        const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:"territory",filterValue:"",pageNumber:paginationModel.page,startDate:startDate,endDate:endDate,territoryName:territoryFilter })
      console.log("respponse",response);
      const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
      setData(jsonArrayWithId)
      setRowCount(response.count[0].count)
      }
      // setData(response.items);
      setLoading(false);
    }
    catch(err){
  console.error(err)
  setLoading(false);
  window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again");  
    }
    // setQueryOptions({ filterModel: { ...filterModel } });
  };


        const getColumns1=()=>{
          const stringOperators = getGridStringOperators().filter((op => ['contains'].includes(op.value)));
        let result= [
            {
              field: "sfid",
              headerName: "SF ID",
              sortable: false,
              width: 250,
              filterable: false,
              // editable: true,
              valueGetter:(params)=>params.row?.sfid
              ,
              renderCell: (params) => {
                // console.log("PARAMS",params)
                let val = params.row?.sfid
                ;
                return <Tooltip title={val}>{val}</Tooltip>;

              },
              filterOperators: stringOperators 
              // filterOperators: ['Contains'],
            },
            {
              field: "farmer_name__c",
              headerName: "Farmer Name",
              sortable: false,
              width: 200,
              valueGetter:(params)=>params.row?.farmer_name__c
              ,
              renderCell: (params) => {
                let val = params.row?.farmer_name__c||"N/A";
                return <Tooltip title={val}>{val}</Tooltip>;

              },
              filterOperators: stringOperators 
              // filterOperators: ['Contains'],

            },
            {
              field: "farmer_category__c",
              headerName: "Farmer Category",
              width: 200,
      // filterable: false, 

              sortable: false,
              valueGetter: params => params.row?.farmer_category__c || 'N/A',
              renderCell: params => {
                // console.log(params.row?.container?.id)
                const value = params.row?.farmer_category__c || 'N/A'
                return <Tooltip title={value}>{value}</Tooltip>
              },
              filterOperators: stringOperators 
            },
              {
                field: "mobile__c",
                headerName: "Mobile Number",
                width: 200,
      // filterable: false, 

                sortable: false,
                valueGetter: params => params.row?.mobile__c|| 'N/A',
                renderCell: params => {
                  // console.log(params.row?.container?.id)
                  const value = params.row?.mobile__c|| 'N/A'
                  return <Tooltip title={value}>{value}</Tooltip>
                },
                filterOperators: stringOperators 
              },
                {
                  field: "createddate",
                  headerName: "Created Date",
                  width: 200,
                  sortable: false,
                  filterable: false, 
                  valueGetter: params => {
                      const value =  params.row.createddate ||"N/A"
                      return value
                  },
                  renderCell: params => {
                    // console.log(params.row.quotation.attributes.shippingOrders.parent.id)
                    const value =  params.row.createddate||"N/A"
                    return <Tooltip title={value}>{value}</Tooltip>
                  },
                  filterOperators: stringOperators,
                  filterable: false, 
              },
           
            {
              field: "name__c",
              headerName: "State",
              sortable: false,
              width: 200,
      // filterable: false, 

              valueGetter:(params)=>params.row?.name__c   ||"N/A",
              renderCell: (params) => {
                let val = params.row?.name__c ||"N/A";
                return <Tooltip title={val}>{val}</Tooltip>;

              },
              filterOperators: stringOperators 
            },
            {
              field: "district_name__c",
              headerName: "District",
              sortable: false,
              width: 200,
      // filterable: false, 

              valueGetter:(params)=>params.row?.district_name__c||"N/A" ,
              renderCell: (params) => {
                let val = params.row?.district_name__c||"N/A";
                return <Tooltip title={val}>{val}</Tooltip>;

              },
              filterOperators: stringOperators 
            },
            {
              field: "sub_district_name__c",
              headerName: "Tehsil",
              sortable: false,
              width: 200,
      // filterable: false, 

              valueGetter: (params) =>params.row?.sub_district_name__c||"N/A",
              filterOperators: stringOperators 
            },
            {
              field: "village_name__c",
              headerName: "Village",
              sortable: false,
      // filterable: false, 

              width: 200,
              valueGetter:(params)=>params.row?.village_name__c||"N/A"              ,
              renderCell: (params) => {
                let val = params.row?.village_name__c;
                return <Tooltip title={val}>{val}</Tooltip>;

              },filterOperators: stringOperators 
            },
            {
              field: "crop__c",
              headerName: "Crop",
              sortable: false,
      // filterable: false, 

              width: 200,
              valueGetter:(params)=>params.row?.crop__c||"N/A"              ,
              renderCell: (params) => {
                let val =  params.row?.crop__c||"N/A" ;
                return <Tooltip title={val}>{val}</Tooltip>;

              },filterOperators: stringOperators 
            }, 
            {
              field: "category__c",
              headerName: "Category",
              width: 200,
              sortable: false,
              valueGetter: params => {
                  const value =  params.row?.farmer_range__c||"N/A"
                  return value
              },
              renderCell: params => {
                // console.log(params.row.quotation.attributes.shippingOrders.parent.id)
                const value =  params.row?.farmer_range__c||"N/A"
                return <Tooltip title={value}>{value}</Tooltip>
              },filterOperators: stringOperators 
          }, 
            {
              field: "season__c",
              headerName: "Season",
              width: 200,
              sortable: false,
              // filterable: false, 
              valueGetter: params => params.row?.season__c || 'N/A',
              renderCell: params => {
                const value = params.row?.season__c|| 'N/A'
                return <Tooltip title={value}>{value}</Tooltip>
              },filterOperators: stringOperators 
        
            },
            {
              field: "irrigation_method__c",
              headerName: "Irrigation Method ",
              width: 200,
              sortable: false,
              // filterable: false, 
              valueGetter: params => params.row?.irrigation__c || 'N/A',
              renderCell: params => {
                const value = params.row?.irrigation__c || 'N/A'
                return <Tooltip title={value}>{value}</Tooltip>
              },
              filterOperators: stringOperators 
        
            },
      {
              field: "acreage__c",
              headerName: "Total Acreage",
              width: 200,
              sortable: false,
              // filterable: false, 
              valueGetter: params => {
                  const value =  params.row?.acreage__c||"N/A"
                  return value
              },
              renderCell: params => {
                // console.log(params.row.quotation.attributes.shippingOrders.parent.id)
                const value =  params.row.acreage__c||"N/A"
                return <Tooltip title={value}>{value}</Tooltip>
              },
              filterOperators: stringOperators 
          },
   

          
          ];

    return result;
  };


  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            fileName:"FarmerManagement",
          }}
        />
      </GridToolbarContainer>
    );
  }

  const renderContent = () => {
   

   

    return (
      <DataGridContainer>
        <DataGrid
          className="payrollGrid"
          disableSelectionOnClick={true}
          disableRowSelectionOnClick
          rows={data|| []}
          columns={getColumns1()}
          rowHeight={50}
          checkboxSelection={false}
          
          onRowSelectionModelChange={(selectedRowIndices) => {
            // console.log("Selected Row Indices:", selectedRowIndices);

            // Get the selected rows' data using the selected indices

            // console.log("Selected Row Data:", selectedRowData);

            setSelectedRowIds(selectedRowIndices);
          }}

          filterMode="server"
          onFilterModelChange={(val)=>
            {
              console.log("vvvv",val);
          //     setQueryOptions(val);
          //     if(activeTab === 0)
          if(val?.items[0]?.field==="farmer_category__c"||"category__c"){
              if(val?.items[0]?.value?.length>0){
            onFilterChange1(val.items[0])
            setSearchTerm(val.items[0])
              }
              else if(!val.items?.value && !endDate && !startDate && !territoryFilter){
                setSearchTerm(null)
                fetchData()
                console.log("check2")
              }
              else if(!val.items?.value && endDate && startDate && territoryFilter){
                setSearchTerm(null)

                onFilterChange1()
                console.log("check2")
              }
              else if(!val.items?.value && endDate && startDate && !territoryFilter){
                setSearchTerm(null)

                onFilterChange1()
                
                console.log("check2")

              }
          }
          else{
          if(val?.items[0]?.value?.length>0){
            onFilterChange1(val.items[0])
            setSearchTerm(val.items[0])
          // else
          // onFilterChange2(val)

          }
          else if(!val.items?.value && !endDate && !startDate && !territoryFilter){
            setSearchTerm(null)
            fetchData()
            console.log("CHECK1")
          }
          else if(!val.items?.value && endDate && startDate && territoryFilter){
            setSearchTerm(null)

            onFilterChange1()
            console.log("checkterr")
          }
          else if(!val.items?.value && endDate && startDate && !territoryFilter){
            setSearchTerm(null)
            console.log("check2")
            onFilterChange1()


          }
          else{
            setSearchTerm(null)
            console.log("check2")
            onFilterChange1()
          }
        }
          }
        }
          rowCount={rowCount}
        
          // pageSizeOptions={[10]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          // autoPageSize
          components={{
            Toolbar: CustomToolbar,
          }}
          
          // onRowClick={handleRowClick}
          //   getRowClassName={getRowClassName}
        />
      </DataGridContainer>
    );
  };
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  console.log("CurrentPage",paginationModel.page)

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
if(searchTerm  ){
  const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:searchTerm?.field,filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:formattedStartDate,endDate:formattedCurrentDate,territoryName:territoryFilter })
  const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
  setData(jsonArrayWithId)
  // setData(response.items);
  setRowCount(response.count[0].count)  
}else{
  const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:"ytd",filterValue:searchTerm,pageNumber:paginationModel.page,startDate:formattedStartDate,endDate:formattedCurrentDate,territoryName:territoryFilter })
  const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
      setData(jsonArrayWithId)
      // setData(response.items);
      setRowCount(response.count[0].count)
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
if(searchTerm){
  const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:searchTerm.field,filterValue:searchTerm.value,pageNumber:paginationModel.page,startDate:formattedStartOfMonth,endDate:formattedCurrentDate,territoryFilter:territoryFilter })
  const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
  setData(jsonArrayWithId)
  // setData(response.items);
  setRowCount(response.count[0].count)  
}else{
  const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:"mtd",filterValue:searchTerm,pageNumber:paginationModel.page,startDate:formattedStartOfMonth,endDate:formattedCurrentDate,territoryFilter:territoryFilter })
  const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
      setData(jsonArrayWithId)
      // setData(response.items);
      setRowCount(response.count[0].count)
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
setStartDate("2023-10-06")

console.log("Current Date:", formattedCurrentDate);
if(searchTerm){
const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:searchTerm.field,filterValue:searchTerm.value,pageNumber:paginationModel.page,startDate:"2023-10-06",territoryFilter:territoryFilter })
const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
      setData(jsonArrayWithId)
      // setData(response.items);
      setRowCount(response.count[0].count)
}else{
const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:"ftd",filterValue:searchTerm,pageNumber:paginationModel.page,startDate:"2023-10-06",territoryFilter:territoryFilter })
const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
      setData(jsonArrayWithId)
      // setData(response.items);
      setRowCount(response.count[0].count)
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

  console.log("SEARCH",searchTerm)
  if(searchTerm){
    console.log("CHECKFILTER1")
  const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:searchTerm.field,filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:startDate,endDate:endDate,territoryName:data })
  const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
  setData(jsonArrayWithId)
  // setData(response.items);
  setRowCount(response.count[0].count)  
}
  else{
    console.log("CHECKFILTER2")

  const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:"territory",filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:startDate,endDate:endDate,territoryName:data })
  const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
  setData(jsonArrayWithId)
  // setData(response.items);
  setRowCount(response.count[0].count)
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
  setDateRange1(true)
  const datePickerResponse = new Date(data);

const year = datePickerResponse.getFullYear();
const month = String(datePickerResponse.getMonth() + 1).padStart(2, '0');
const day = String(datePickerResponse.getDate()).padStart(2, '0');

const formattedDate = `${year}/${month}/${day}`;
setStartDate1(formattedDate)
setStartDate(formattedDate)
if(endDate){
  setLoading(true)
  try{
console.log("checkFirstDate")
if(searchTerm){
  const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:searchTerm.field,filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:formattedDate,endDate:endDate,territoryName:territoryFilter })
  const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
  setData(jsonArrayWithId)
  // setData(response.items);
  setRowCount(response.count[0].count)
}
else{
  const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:"territory",filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:formattedDate,endDate:endDate,territoryName:territoryFilter })
  const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
  setData(jsonArrayWithId)
  // setData(response.items);
  setRowCount(response.count[0].count)
}
setLoading(false)
}
catch(e){
  console.log(e)
  setLoading(false)
  window.NotificationUtils.showError("Error While Recieving Data Please Wait and try again");

  fetchData()
}
}

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
    if(searchTerm){
    const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:searchTerm.field,filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:startDate,endDate:data?formattedDate:endDate,territoryName:territoryFilter })
    const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
    setData(jsonArrayWithId)
    // setData(response.items);
    setRowCount(response.count[0].count)  
  }
    else{
    const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:"territory",filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:startDate,endDate:data?formattedDate:endDate,territoryName:territoryFilter })
    const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
    setData(jsonArrayWithId)
    // setData(response.items);
    setRowCount(response.count[0].count)
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
  if(searchTerm||territoryFilter){
    try{
    setLoading(true)
    const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:searchTerm?searchTerm.field:"territory",filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:'',endDate:'',territoryName:territoryFilter })
    const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
    setData(jsonArrayWithId)
    // setData(response.items);
    setRowCount(response.count[0].count)
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
  if(searchTerm||startDate||endDate){
    try{
    setLoading(true)
    const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:searchTerm?searchTerm.field:"territory",filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:startDate,endDate:endDate,territoryName:'' })
    const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
    setData(jsonArrayWithId)
    // setData(response.items);
    setRowCount(response.count[0].count)
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
    if(searchTerm||territoryFilter)
  {
    const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:searchTerm?searchTerm?.field:"territory",filterValue:searchTerm?.value,pageNumber:paginationModel.page,startDate:'',endDate:'',territoryName:territoryFilter })
    const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
    setData(jsonArrayWithId)
    // setData(response.items);
    setRowCount(response.count[0].count)
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
    <>
      {isMobile && <Drawer props={props} />}
      <StaffEditorPageContainer>
        <HeaderContainer>
          <Typography variant="h5">Farmer Mapping</Typography>
          <div style={{display:"flex",flexDirection:"row",gap:"20px",paddingLeft:"15%"}}>
            <Button variant="contained" disabled={ytdFilter||dateRange1||loading} onClick={()=>YTD()}>YTD</Button>
            <Button variant="contained" disabled={mtdFilter ||dateRange1||loading} onClick={()=>MTD()}>MTD</Button>
            <Button variant="contained" disabled={ftdFilter ||dateRange1||loading} onClick={()=>FTD()} >FTD</Button>
            <Button variant="contained" disabled={cumalativeFilter ||dateRange1||loading} onClick={()=>CumulativeFiltefunctionr()}>Cumulative</Button>

          </div>
        </HeaderContainer>
        {/* <Stack spacing={2} direction={"row"}>
          <Stack direction={"row"} spacing={1}> */}
          <HeaderContainer>
<div style={{width:"100%",display:"flex",flexDirection:"row",gap:"20px"}}>
          {/* <Autocomplete
              // value={cityVal.find((city) => city.id === deliveryCity) || ''}
            //   value={deliveryCity || null}
            clearOnBlur={false}
  // disableClearable
              options={territoryType}
              value={selectedTeritoryType}
              
              getOptionLabel={(option) => `${option?.territoryMapping}`}
              getOptionValue={(option) => option?.id || ''}
              style={{ width: isMobile ? "40%" : "30%"}}
              noOptionsText={loading ? "Loading..." : "No option"}
              clearOnEscape={!selectedTeritoryType&&true}
              disabled={loading}
              onChange={async(event, value) => {
                console.log("Autocomplete",value)
               setSelectedTerritoryType(value)
               let filterData=territoryType?.filter(select=>select.territoryMapping===event?.target?.innerText)
               console.log("Autocomplete",filterData)
               setTerritoryOptions(filterData)           
              }}
              onInputChange={(event, value) => {
                // Check if the user's input matches any option
                const matchingOption = territoryType?.find((option) => option.territoryMapping === event?.target?.innerText);

                if (!matchingOption ) {
              //     // If there's no matching option, set the otherValue to null
              //   //   setDeliveryCity(null);
              //   // setSelectedContainer(null);
               setSelectedTerritoryType(null)
               setTerritoryOptions('')           
               setTerritoryFilter(null)

                return;
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Territory Type"
                  variant="outlined"
                
                  
                  
                />
              )}
            />
            <Autocomplete
              // value={cityVal.find((city) => city.id === deliveryCity) || ''}
            //   value={deliveryCity || null}
            clearOnBlur={false}
  // disableClearable
              options={territoryOptions}
              value={territoryFilter}
              getOptionLabel={(option) => `${option?.name}`}
              getOptionValue={(option) => option?.id || ''}
              style={{ width: isMobile ? "40%" : "40%"}}
              noOptionsText={loading ? "Loading..." : "No option"}
              disabled={!territoryOptions||loading}
              onChange={async(event, value) => {
                console.log("valueAuto",value?.name)
                setTerritoryFilter(value?.name)
                fetchTerritoryFilter(value?.name)

               
                
              }}
              onInputChange={(e, value) => {
                const matchingOption = territoryOptions?.find((option) => option?.name === value?.name);

                // Check if the user's input matches any option
                // const matchingOption = autocomplete.find((option) => option.name === value);

                if (!matchingOption ) {
                //   // If there's no matching option, set the otherValue to null
                // //   setDeliveryCity(null);
                // // setSelectedContainer(null);
                setTerritoryFilter(null)
                return;
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Territory"
                  variant="outlined"
                  disabled={!territoryOptions}
                
                  
                  
                />
              )}
            /> */}
             <TextField
          id="outlined-select-currency"
          select
          label="Select Territory Type"
          style={{ width: isMobile ? "40%" : "30%"}}
          // defaultValue="EUR"
          // helperText="Please select your currency"
          value={selectedTeritoryType}
          onChange={async(event, value) => {
            console.log("Autocomplete",event?.target?.value)
           setSelectedTerritoryType(event?.target?.value)
           let filterData=territoryType?.filter(select=>select.territoryMapping===event?.target?.value)
           console.log("Autocomplete",filterData)
           setTerritoryOptions(filterData) 
                     
          }}
        >
          {territoryType?.map((option) => (
            <MenuItem key={option.id} value={option.territoryMapping}>
              {option.territoryMapping}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Select Territory"
          style={{ width: isMobile ? "40%" : "35%"}}
          // defaultValue="EUR"
          // helperText="Please select your currency"
          value={territoryFilter}
          disabled={!territoryOptions?.length||loading}
          onChange={async(event, value) => {
            console.log("valueAuto",event?.target?.value)
            setTerritoryFilter(event?.target?.value)
            fetchTerritoryFilter(event?.target?.value)

           
            
          }}
        >
          {territoryOptions?.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
          
            <Button variant="contained"     disabled={!territoryOptions||loading}   onClick={()=>clearTerritoryFIlter()} >Clear</Button>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem sx={{paddingLeft:"1%"}} />
           
            <div style={{width:"100%",display:"flex",flexDirection:"row",gap:"20px",paddingLeft:"15%",paddingTop:"4px"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Start Date" value={startDate1} disabled={ftdFilter||mtdFilter||ytdFilter||loading} format="YYYY/MM/DD" onChange={(data)=>formatDate(data.$d)} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="End Date" value={endDate1} disabled={ftdFilter||mtdFilter||ytdFilter||!dateRange1||loading} format="YYYY/MM/DD" onChange={(data)=>finalDateRangeFilter(data.$d)} />
            </LocalizationProvider>
            <Button variant="contained" onClick={()=>clearDateFilter()} disabled={!dateRange1||loading} >Clear</Button>


            </div>
            
</HeaderContainer>
          {/* </Stack>
          </Stack> */}

        <TableContainer>
         
          {loading && <OpaqueLoading />}
          {renderContent()}
        </TableContainer>
      
     
      </StaffEditorPageContainer>
    </>
  );
}
