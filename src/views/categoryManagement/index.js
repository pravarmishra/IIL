import {
    Box,
    Button,
    Card,
    Container,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    ListItem,
    MenuItem,
    Paper,
    Popover,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    
  } from '@mui/material';
  import React, { useEffect, useState } from 'react';
//   import Iconify from 'src/components/iconify/Iconify';
//   import SimpleBackdrop from 'src/components/loader/Loader';
  import PickListPage from '../picklistManagement/index.js';
  import CheckIcon from '@mui/icons-material/Check';
  import styled from '@emotion/styled';
  import { DataGrid, GridToolbarColumnsButton } from '@mui/x-data-grid';
  import { GridToolbarContainer } from '@mui/x-data-grid';
  import { GridToolbarFilterButton } from '@mui/x-data-grid';
  import { GridToolbarExport } from '@mui/x-data-grid';
  import OpaqueLoading from "../../components/opaqueLoading/opaqueLoading";
  
  const isMobile = window.innerWidth < 900;
  const HeaderContainer = styled.div`
  
      display:flex;
  
      align-items:center;
  
      justify-content:space-between;
  
      margin-bottom:10px;
  
  `
  
  const StaffEditorPageContainer = styled.div`
    height: ${isMobile ? `100%` : `calc(100vh - 130px)`};
    width: 100%;
    // padding: 10px 15px;
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
  
  const ContentContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 15px;
  flex-direction: column;
`;

const DataGridContainer = styled.div`
  height: calc(100vh - 159px);
  width: 100%;
  position: relative;
`;

// const DataGridStyled = styled(DataGrid)`
//   background: white;
//   border-radius: 10px !important;
//   box-shadow: ${SHADOW};
//   .MuiDataGrid-overlay{
//     .MuiCircularProgress-root{
//       color: ${PRIMARY_COLOR}
//     }
//   }
// `;
const Toolbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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
  
  
  const CategoryPage = () => {
    const [isloader, setIsloader] = React.useState(false);
    const [category, setCategory] = useState('');
    const [openRolePopover, setOpenPopover] = React.useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [propID, setPropID] = useState('');
    const [view, setView] = useState(0);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRow,setSelectedRow]=useState();
   
  
    const filtereCategory = categoryData.filter((el) =>
      Object.values(el).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    console.log('categoryData', categoryData);
    const getCategoryData = async () => {
      try {
        setIsloader(true);
        const response = await window.Platform.database.getPicklistCategories();
        console.log('category response data', response.data);
        setIsloader(false);
        if (!response.hasError) {
          setCategoryData([...categoryData, ...response.data]);
        }
      } catch (error) {
        setIsloader(false);
        console.error(error);
      }
    };
    useEffect(() => {
      getCategoryData();
    }, []);
  
    const handleAddCategory = async () => {
      setIsloader(true);
      if (category === '') {
        setIsloader(false);
        window.NotificationUtils.showWarning('Field is Empty, Please fill the field');
      } else {
        try {
          const response = await window.Platform.database.addPicklistCategories(category);
          console.log('res', response.data);
          if (response.hasError === false) {
            setIsloader(false);
            setCategoryData([...categoryData, response.data]);
            console.log('categoryData', categoryData);
            setCategory('');
            window.NotificationUtils.showSuccess('Category added successfull');
          } else {
            setIsloader(false);
            console.log('error');
            window.NotificationUtils.showError('Something went wrong, Please try again!! ');
          }
        } catch (error) {
          setIsloader(false);
          console.error(error);
          window.NotificationUtils.showError('Something went wrong, Please try again!! ');
        }
      }
    };
  
    const [ID, setID] = React.useState('');
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [editData, setEditData] = React.useState(null);
    const [showModalEdit, setShowModalEdit] = React.useState(false);
    const [nameProp, setNameProp] = useState('');
  
    const handleEdit = (id) => {
      setShowModalEdit((prev) => (prev = !prev));
      let selected = categoryData.find((item) => item.id === id);
      setEditData(selected);
      setOpenPopover(null);
    };
  
    const handleDelete = async (id) => {
      const response = await window.Platform.database.deleteRoleById(id);
      let res = categoryData.filter((el) => {
        return el.id != id;
      });
      setCategoryData(res);
      setOpenPopover(null);
    };
    const handleDeleteNotification = (e, id) => {
      setID(id);
      setShowDeleteModal((prev) => (prev = !prev));
    };
    const handleOpenPopover = (event) => {
      setOpenPopover(event.currentTarget);
    };
  
    const handleClosePopover = () => {
      setOpenPopover(null);
    };
    //-----------Pagination-----------
  
   
    const handleViewPicklist = (ID, name) => {
      setView(1);
      setPropID(ID);
      setNameProp(name);
    };
  
    const handleColumns = () => {
      const columns = [
        { field: 'id', headerName: 'S.No', width:isMobile?100: 250 },
        { field: 'cid', headerName: 'Category ID', minWidth:isMobile?200: 390},
        { field: 'category', headerName: 'Category',minWidth:isMobile?250: 390 },
       
      ];
  
      // columns.push({
      //   field: ' b',
      //   headerName: 'Actions',
      //   editable: false,
      //   minWidth: 150,
      //   disableColumnMenu: true,
      //   disableExport: true,
      //   disableReorder: true,
      //   hideSortIcons: true,
      //   renderCell: (params) => {
      //     // console.log("params",params)
      //     return (
      //       <>
            
      //         <IconButton sx={{marginLeft:"-10px"}} size="large" color="inherit" onClick={handleOpenPopover}>
      //                           {/* <Iconify icon={'eva:more-vertical-fill'} /> */}
      //                         </IconButton>
      //                         <IconButton
      //                         sx={{marginLeft:"-8px"}}
      //                           size="large"
      //                           color="inherit"
      //                           onClick={() => handleViewPicklist(params.row.cid, params.row.category)}
                                
      //                         >
      //                           <CheckIcon />
      //                         </IconButton>
  
      //         <Popover
      //                         open={Boolean(openRolePopover)}
      //                         anchorEl={openRolePopover}
      //                         onClose={handleClosePopover}
      //                         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      //                         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      //                         PaperProps={{
      //                           sx: {
      //                             p: 1,
      //                             width: 140,
      //                             '& .MuiMenuItem-root': {
      //                               px: 1,
      //                               typography: 'body2',
      //                               borderRadius: 0.75,
      //                             },
      //                           },
      //                         }}
      //                       >
      //                         <MenuItem onClick={() => handleEdit(params.id)}>
      //                           {/* <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} /> */}
      //                           Edit
      //                         </MenuItem>
  
      //                         <MenuItem sx={{ color: 'error.main' }} onClick={(e) => handleDeleteNotification(e, params.id)}>
      //                           {/* <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} /> */}
      //                           Delete
      //                         </MenuItem>
      //                       </Popover>
      //       </>
      //     );
      //   },
      // });
  
      return columns;
    }; 
  
    const rows = filtereCategory.map((item, index) => ({
      id: index + 1,
      cid: item.objectid,
      category: item.name,
      
    }));
  
  console.log(rows);
  
  
    return (
      <>
      {isloader&&<OpaqueLoading/>}
        {view == 0 && (
          <ContentContainer>
            <HeaderContainer>
            <Typography  variant="h5">Category List</Typography>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                
                // backgroundColor: '#003974',
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
                //  startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Category
              </Button>
            
              </HeaderContainer>
  
            {view === 0 && 
               <DataGridContainer>
             <DataGrid autoPageSize rows={rows} columns={handleColumns()} density="standard"
             checkboxSelection={true}
                 onRowClick={(params) => {
                  console.log("RowClick",params)
               
                  const newRowId = params.row
               console.log("newRowId",newRowId)
      // setSelectedRowId(params.row.id)
      setSelectedRow(newRowId)
      setView(1)
                }}
                disableSelectionOnClick
          disableRowSelectionOnClick
                components={{
                  Toolbar: CustomToolbar,
                }}
                />
             </DataGridContainer>
              }
            {/* {isloader && <SimpleBackdrop></SimpleBackdrop>} */}
          </ContentContainer>
        )}
        {view === 1 && (
          <>
            {' '}
           
            <PickListPage category={selectedRow.cid} name={selectedRow.category} setView={()=>setView(0)} />
          </>
        )}
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{
          style: {
            minWidth: 350,
            maxWidth: 400,
            minHeight: 300,
            maxHeight: 350,
          },
        }}>
          <DialogContent>
          {/* {
                        isloader && <SimpleBackdrop></SimpleBackdrop>
                    } */}
            <Typography variant="h4" color={'#003974'}>
              Add Category
            </Typography>
            <Stack spacing={1} direction={'row'} sx={{ marginTop: '40px' }}>
              <TextField
                required
                fullWidth
                size="small"
                type="text"
                label="Category"
                autoFocus
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              size="small"
              variant="outlined"
              sx={{ color: '#003974', borderColor: '#003974', borderRadius: '40px', padding: '5px 10px' }}
              onClick={() => handleAddCategory()}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  export default CategoryPage;
  