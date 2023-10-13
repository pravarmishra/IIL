
import styled from '@emotion/styled'
import { TextFields } from '@mui/icons-material'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, IconButton, InputLabel, MenuItem, Paper, Popover, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { GridToolbarFilterButton } from '@mui/x-data-grid'
import { GridToolbarExport } from '@mui/x-data-grid'
import { GridToolbarColumnsButton } from '@mui/x-data-grid'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import CategoryIcon from '@mui/icons-material/Category';
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppsIcon from '@mui/icons-material/Apps';
import OpaqueLoading from "../../components/opaqueLoading/opaqueLoading";



// import Iconify from 'src/components/iconify/Iconify'
// import SimpleBackdrop from 'src/components/loader/Loader'



const isMobile = window.innerWidth < 900;
const ContentContainer = styled.div`
display: flex;
gap: 10px;
padding: 10px 15px;
flex-direction: column;
`;

const DataGridContainer = styled.div`
height:${isMobile?"calc(100vh - 314px)":"calc(100vh - 204px)"};
width: 100%;
position: relative;
`;
const HeaderContainer = styled.div`
  
display:flex;

align-items:center;

justify-content:space-between;

margin-bottom:10px;

`

const StaffEditorPageContainer = styled.div`
  height: ${isMobile ? `95%` : `calc(100vh - 150px)`};
  width: 100%;
  padding: 10px 15px;
  ${isMobile &&
  `
    position: relative;
    
    `}
    display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
`;


const DataGridWrapper = styled.div`
  height: ${isMobile ? `100%` : `calc(100vh - 225px)`};
  margin-left:${isMobile?`5px`:`53px`};
  width:${isMobile?`97%`:`91%`};
  background-color: white;
  border: 1px solid #000;
  border-color: #003974;
  border-radius: 5px;
`;

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <Button
        size="small"
        component={GridToolbarColumnsButton}
        variant="text"
        sx={{ borderRadius: '40px', padding: '5px 10px', color: '#85c225' }}
      />
      <Button
        size="small"
        component={GridToolbarFilterButton}
        variant="text"
        sx={{ borderRadius: '40px', padding: '5px 10px', color: '#85c225' }}
      />

      <Button
        size="small"
        component={GridToolbarExport}
        variant="text"
        sx={{ borderRadius: '40px', padding: '5px 10px', color: '#85c225' }}
      />
    </GridToolbarContainer>
  );
};
const PickListPage = ({category,name,setView}) => {

  const [isloader, setIsloader] = React.useState(false)
  const [picklistData, setPicklistData] = useState([])
  const [categoryID, setCategoryID] = useState("")


  const getPicklistData = async () => {
    try {
      setIsloader(true)
      const response = await window.Platform.database.getPicklist();
      console.log("picklist response data", response.data);
      
      if (!response.hasError) {
        setPicklistData([...picklistData, ...response.data])
        setIsloader(false)
      }
    } catch (error) {
      setIsloader(false)
      console.error(error);
    }
  }
  useEffect(() => {
    getPicklistData()
  }, [])


  const [categoryData, setCategoryData] = useState([])

  const [perticularCategory, setPerticularCategory] = useState([])
  const [Name, setName] = useState("")
  const [open,setOpen]=useState(false);


  useEffect(()=>{
    const categorySingle=picklistData.filter((el,i) => {
          return el.categoryid == category
        })
        console.log("SHOW data..=>", categorySingle)
        setPerticularCategory(categorySingle);
  })

 
  const getCategoryData = async () => {
    try {
      setIsloader(true)
      const response = await window.Platform.database.getPicklistCategories();
      console.log("category response data", response.data);
      if (!response.hasError) {
          setCategoryData([categoryData, ...response.data])
        }
        setIsloader(false)
    } catch (error) {
      setIsloader(false)
      console.error(error);
    }
  }
  useEffect(() => {
    getCategoryData()
  }, [])

  const handleAddPicklist = async () => {
    console.log("DATA to be send: ", Name, categoryID);
    setIsloader(true)
    if (Name === "") {
      setIsloader(false)
      window.NotificationUtils.showWarning("Field is Empty, Please fill the field")
    }
    else {
      const sentData = {
        "categoryId": category,
        "name": Name
      }
      try {
        const response = await window.Platform.database.addPicklist(sentData);
        console.log("res", response.data);
        if (response.hasError === false) {
          setIsloader(false)
          setPicklistData([...picklistData, response.data])
          console.log("picklistData", picklistData);
          setName("")
          window.NotificationUtils.showSuccess("Picklist added successfull")
        }
        else {
          setIsloader(false)
          console.log("error");
          window.NotificationUtils.showError("Something went wrong, Please try again!! ")
        }
      } catch (error) {
        setIsloader(false)
        console.error(error);
        window.NotificationUtils.showError("Something went wrong, Please try again!! ")
      }
    }
  }


  //--------popover----------------
  const [ID, setID] = React.useState("")
  const [openRolePopover, setOpenPopover] = React.useState(null)

  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const [editData, setEditData] = React.useState(null)
  const [showModalEdit, setShowModalEdit] = React.useState(false)

  const handleEdit = (id) => {
    setShowModalEdit((prev) => prev = !prev)
    let selected = categoryData.find((item) => item.id === id);
    setEditData(selected);
    setOpenPopover(null)
  };

  
  const handleDeleteNotification = (e, id) => {
    setID(id)
    setShowDeleteModal((prev) => prev = !prev)
  }
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  //-----------Pagination-----------



 

  const filtereCategory = perticularCategory.filter((el) =>
Object.values(el)
  .join(' ')
  .toLowerCase()
  
);
const handleColumns = () => {
  const columns = [
    { field: 'id', headerName: 'S.No', width:isMobile?100: 200 },
    { field: 'cid', headerName: 'Category ID', minWidth:isMobile?200: 360},
    { field: 'category', headerName: 'Category',minWidth:isMobile?250: 360 },
   
  ];

  columns.push({
    field: ' b',
    headerName: 'Actions',
    editable: false,
    minWidth: 150,
    disableColumnMenu: true,
    disableExport: true,
    disableReorder: true,
    hideSortIcons: true,
    renderCell: (params) => {
      // console.log("params",params)
      return (
        <>
        
          <IconButton sx={{marginLeft:"-10px"}} size="large" color="inherit" onClick={handleOpenPopover}>
                            {/* <Iconify icon={'eva:more-vertical-fill'} /> */}<AppsIcon/>
                          </IconButton>
                          

          <Popover
                          open={Boolean(openRolePopover)}
                          anchorEl={openRolePopover}
                          onClose={handleClosePopover}
                          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: {
                              p: 1,
                              width: 140,
                              '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        >
                          <MenuItem onClick={() => handleEdit(params.id)}>
                            {/* <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} /> */}
                            Edit
                          </MenuItem>

                          <MenuItem sx={{ color: 'error.main' }} onClick={(e) => handleDeleteNotification(e, params.id)}>
                            {/* <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} /> */}
                            Delete
                          </MenuItem>
                        </Popover>
        </>
      );
    },
  });

  return columns;
}; 

const rows = filtereCategory.map((item, index) => ({
  id: index + 1,
  cid: item.categoryid,
  category: item.name,
  
}));

  return (
    <>
    <ContentContainer>
    {isloader&&<OpaqueLoading/>}
        <HeaderContainer>
            <Stack direction={"row"}>
            <Tooltip title=" Back to category management">
        <Button sx={{ color:  '#85c225',marginLeft:isMobile&&"-20px",'&:hover': {fontSize:"20px",
      background: 'transparent', 
    }, }} variant='text' size='large' onClick={() => setView()}>
              <ArrowBackIcon  />
            </Button>
            </Tooltip>
        <Typography  variant="h5" sx={{marginBottom:"-18px"}}>Picklist{"("+category+")"}</Typography>
        
            </Stack>
         {/* <ButtonContainer> */}
          <Button
            type="submit"
            onClick={()=>setOpen(true)}
             variant="contained"
             sx={{
              
                background: '#85c225',
                // marginTop:"-10px",
                // marginBottom: '5px',
                // borderRadius: '40px',
                // padding: '5px 10px',
                // marginRight: isMobile?'5px':'50px',
                '&:hover': {
                  background: '#91b944', 
                },
            }}
            // startIcon={<Iconify icon="eva:plus-fill" />}
            >
            Add PickList
          </Button>
          
          {/* </ButtonContainer> */}
          </HeaderContainer>

            {/* {
                      isloader && <SimpleBackdrop></SimpleBackdrop>
                  } */}
      {picklistData &&
        
        <DataGridContainer>
        <DataGrid autoPageSize density='standard' rows={rows} columns={handleColumns()} components={{
                  Toolbar: CustomToolbar,
                 
                }}/>
        </DataGridContainer>
      }
  </ContentContainer>
<Dialog open={open} onClose={() => setOpen(false)} PaperProps={{
        style: {
          minWidth: 350,
          maxWidth: 400,
          minHeight: 300,
          maxHeight: 350,
        },
      }}>
        {/* <DialogTitle>Apply For Leave</DialogTitle> */}
        <DialogContent >
          {/* <Card sx={{ width: "100%",minHeight:200 }}> */}
          {/* {
                      isloader && <SimpleBackdrop></SimpleBackdrop>
                  } */}
              <Typography variant="h4" color={'#003974'}>
                Add Picklist
              </Typography>
              <Stack spacing={1} direction={'column'} sx={{marginTop:"35px"}}>
             
          <TextField name="clientName"
            label="Category"
            size='small'
            type='text'
            required
            value={name}
            disabled
          />
          <TextField name="clientName"
            label="Name"
            size='small'
            type='text'
            required
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
                
            </Stack>
          {/* </Card> */}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ color: '#003974', borderColor: '#003974', borderRadius: '40px', padding: '5px 10px' }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{ color: '#003974', borderColor: '#003974', borderRadius: '40px', padding: '5px 10px' }}
            size='small'
            variant="outlined"
            onClick={() => handleAddPicklist()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
     
    </>
  )
}

export default PickListPage



