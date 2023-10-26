import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import { MuiOtpInput } from 'mui-one-time-password-input';
import { useNavigate } from 'react-router-dom';
import { IconButton, Stack } from '@mui/material';
// import SimpleBackdrop from '../loader/Loader';

import { useContext } from 'react';
import { AuthContext } from '../contextAPI/ContextAPI';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  
  Fab
} from "@mui/material";
import { LOCAL_STORAGE_KEYS } from "../../constants";
import OpaqueLoading from '../opaqueLoading/opaqueLoading';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styled from '@emotion/styled';

const isMobile = window.innerWidth < 900;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledOtpInput = styled(TextField)({
  '& input': {
    fontSize: '12px', // Adjust the font size as per your requirement
    padding: '6px', // Adjust the padding as per your requirement
    width: '18px', // Adjust the width as per your requirement
    height: '18px', // Adjust the height as per your requirement
  },
});


const ModalHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export default function AddCategoryModal({ onClose,fetchData }) {
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const { auth, setAuth } = useContext(AuthContext);
  const [category, setCategory] = React.useState('');
    const [isloader, setIsloader] = React.useState(false);


  let contextState = { ...auth };
  const navigate = useNavigate()

  const handleChange = (e) => {
    console.log("newValue",e.target.value)
    setPassword(e.target.value)
  }
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
        //   setCategoryData([...categoryData, response.data]);
        //   console.log('categoryData', categoryData);
        fetchData()
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


  return (
    <div>
     
     <Dialog  PaperProps={{
        style: {
          minWidth: 350,
          maxWidth: 400,
          minHeight: 300,
          maxHeight: 350,
        },
      }}
      open={open}>
        {/* <DialogTitle>Apply For Leave</DialogTitle> */}
        <DialogContent>
          {/* <Card sx={{ width: "100%",minHeight:200 }}> */}
<ModalHeaderContainer>
<Typography variant="h5" >
            Add Category
          </Typography>

          <IconButton disabled={loading} onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>

</ModalHeaderContainer>
          
          <Stack spacing={1} direction={'row'} sx={{ paddingTop:isMobile?"20px":"50px" }}>
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
          {/* <Button
            variant="outlined"
            sx={{ borderRadius: '40px', padding: '5px 10px' }}
            onClick={onClose}
          >
            Cancel
          </Button> */}
          <Button
            type="submit"
            size="small"
            variant="contained"
            sx={{ borderRadius: '5px', padding: '5px 10px' }}
            onClick={() => handleAddCategory()}
            disabled={loading}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


