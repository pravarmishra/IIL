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

const StyledCardHeading1 = ({ icon, children, value, sx, bgColor }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      ...sx,
      transition: "transform 0.2s", // Add transition property for smooth effect
      ":hover": {
        transform: "scale(1.1)", // Scale up on hover
      },
    }}
  >
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

export default function FarmerManagement(props) {
  const [loading, setLoading] = useState(false);
  const [accessChanges, setAccessChanges] = useState("");
  const [showItemsModal, setShowItemsModal] = useState();
  const [rejectionReason, setRejectionReason] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  //
  const [bulkApprovalModal, setBulkApprovalModal] = useState(false);
  const [isDataOnReasonModal, setDataOnReasonModal] = useState();
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [costingModal,setCostingModal]=useState(false)
  const [containerDetails,setContainerDetails]=useState()
  const [modal,setModal]=useState();
  const [rowCount, setRowCount] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [paginationModel, setPaginationModel] = useState({
  page: currentPage - 1,
  pageSize: 7,
});

useEffect(() => {
  // console.log('check page', paginationModel)
  if(!queryOptions)
  {
    // console.log("heey")
  fetchData(activeTab);
  }
  else{
if(activeTab === 0 && queryOptions){
// {console.log("fff", queryOptions)
    onFilterChange1(queryOptions, paginationModel.page, paginationModel.pageSize)}
  // console.log('Fetching details with pagination',paginationModel.page);
  else if(activeTab === 1 && queryOptions)
  {
    // console.log("hhhelo")
  onFilterChange2(queryOptions, paginationModel.page, paginationModel.pageSize)
  }
  }

}, [paginationModel.page]);

useEffect(() => {
  // console.log('check page', paginationModel)

fetchData()
  // if(!queryOptions)
  // fetchData(activeTab);
}, [paginationModel.page]);

const [queryOptions, setQueryOptions] = React.useState(null);

  // const [dashboardData, setDashboardData] = useState({
  //   adminApproved: 0,
  //   customerApproved: 0,
  //   pending: 0,
  //   totalQuotation: 0,
  //   totalSOGenerated: 0,
  //   totalDeliveredSo:0
  // });
  // console.log("ATIVE", activeTab);

  const bulkApprove = (val) => {
    // console.log("val", val);
  };

  const bulkReject = (val) => {
    // console.log("val", val);
  };

  const fetchData = async (details) => {
    try {
      setLoading(true);
      setData([]);
      let results = await window.Platform.database.getFarmerMappingDetails({pageNumber:paginationModel.page});
      console.log("RESPONSE", results);
      const jsonArrayWithId = results?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
      setData(jsonArrayWithId)
      setRowCount(results.count[0].count)
      
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  console.log("DAATAA",data)
  const onFilterChange1 = async(filterModel) => {

    
    try{  
      setLoading(true);
      // console.log(filterModel,'................................................................')
      const response = await window.Platform.database.getFarmerMappingDetailsFilter({filterField:filterModel.field,filterValue:filterModel.value,pageNumber:paginationModel.page })
      console.log("respponse",response);
      const jsonArrayWithId = response?.data?.map((obj, index) => ({ ...obj, id: index + 1 }));
      setData(jsonArrayWithId)
      // setData(response.items);
      setRowCount(response.count)
      setLoading(false);
    }
    catch(err){
  console.error(err)
  setLoading(false);
  
    }
    // setQueryOptions({ filterModel: { ...filterModel } });
  };
  const onFilterChange2 = async(filterModel, page, pageSize) => {

    if(!filterModel)
    {
      // console.log("queryyyyy",queryOptions.filterModel)
      filterModel = queryOptions.filterModel
  }
    try{  
      setLoading(true);
      // console.log(paginationModel,'................................................................')
      const response = await window.Platform.database.getFarmerMappingDetailsFilter({ ...filterModel,page:page || paginationModel.page, // Pass the current page
      pageSize: pageSize || paginationModel.pageSize })
      // console.log("respponse",response);
      setData(response.items);
      setRowCount(response.totalCount)
      setLoading(false);
    }
    catch(err){
  console.error(err)
  setLoading(false);
  
    }
    // setQueryOptions({ filterModel: { ...filterModel } });
  };
  // useEffect(() => {
  //   fetchData(activeTab);
  // }, [activeTab]);

  // const currentDate = new Date();
  // const currentTimestamp = new Date().getTime();
  // console.log("currentDate",currentTimestamp)


        const getColumns1=()=>{
          const stringOperators = getGridStringOperators().filter((op => ['contains'].includes(op.value)));
        let result= [
            {
              field: "sfid",
              headerName: "SF ID",
              sortable: false,
              width: 250,
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
                  filterOperators: stringOperators 
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
              headerName: "Crop Category",
              width: 200,
              sortable: false,
              valueGetter: params => {
                  const value =  params.row?.category__c||"N/A"
                  return value
              },
              renderCell: params => {
                // console.log(params.row.quotation.attributes.shippingOrders.parent.id)
                const value =  params.row?.category__c||"N/A"
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
              field: "irrigation_method__c ",
              headerName: "Irrigation Method ",
              width: 200,
              sortable: false,
              // filterable: false, 
              valueGetter: params => params.row?.irrigation_method__c || 'N/A',
              renderCell: params => {
                const value = params.row?.irrigation_method__c || 'N/A'
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

  const openPackaging = (val) => {
    window.open(val, "_blank");
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
          checkboxSelection={true}
          
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
          if(val?.items[0]?.field==="farmer_category__c"){
              if(val?.items[0]?.value?.length>0){
            onFilterChange1(val.items[0])

              }
              else{
                fetchData()
              }
          }
          else{
          if(val?.items[0]?.value?.length>2){
            onFilterChange1(val.items[0])
          // else
          // onFilterChange2(val)

          }
          else if(!val.items?.value){
            fetchData()
          }
        }
          }
        }
          rowCount={rowCount}
        
          // pageSizeOptions={[10]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          autoPageSize
          components={{
            Toolbar: CustomToolbar,
          }}
          
          // onRowClick={handleRowClick}
          //   getRowClassName={getRowClassName}
        />
      </DataGridContainer>
    );
  };

  return (
    <>
      {isMobile && <Drawer props={props} />}
      <StaffEditorPageContainer>
        <HeaderContainer>
          <Typography variant="h5">Farmer Management</Typography>
        </HeaderContainer>

        <TableContainer>
         
          {loading && <OpaqueLoading />}
          {renderContent()}
        </TableContainer>
      
     
      </StaffEditorPageContainer>
    </>
  );
}
