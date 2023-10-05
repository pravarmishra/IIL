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
import { styled } from '@mui/material';
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

export default function OTPModal({ onClose, username,props }) {
  const [open, setOpen] = React.useState(true);
  const [isloader, setIsloader] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const { auth, setAuth } = useContext(AuthContext);
  let contextState = { ...auth };
  const navigate = useNavigate()

  const handleChange = (e) => {
    console.log("newValue",e.target.value)
    setPassword(e.target.value)
  }
  const handleLogin = async () => {
    const data = {
      username, password:password
    }
    // setIsloader(true)
    console.log("send data", data);
    if (password === "") {
      setIsloader(false)
      window.NotificationUtils.showWarning("Please fill the Credentials")
    }
    else {
      try {
        contextState.loading = true;
        // setIsloader(true)
        const userResults = await window.Platform.database.login(data);
        window.localStorage.setItem(
            LOCAL_STORAGE_KEYS.STORED_USER_DATA,
            JSON.stringify(userResults)
          );
          setAuth(userResults.attributes);
          contextState.loggedIn = true;
          contextState.token = userResults.attributes.sessionToken;
          contextState.user = userResults.attributes;
          contextState.email = userResults.attributes.email;
          setAuth(contextState);
          if (userResults) {
            props.onAuthUserChanged && props.onAuthUserChanged(userResults);
          }
    
          window.NotificationUtils.showSuccess("Logged In Successfully");
        } catch (error) {
          if (error && error.code === 101) {
            window.NotificationUtils.showError("Invalid Username/Password");
          } else {
            window.NotificationUtils.showError("Something Went Wrong");
          }
        } finally {
          contextState.loading = false;
        }
      };

  }


  return (
    <div>
     
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        {/* {isloader && <SimpleBackdrop></SimpleBackdrop>} */}
        <DialogTitle>{" OTP"}</DialogTitle>
        <DialogContent>

          <DialogContentText id="alert-dialog-slide-description">
            <TextField fullWidth  type="text" onChange={handleChange} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)} sx={{color:"red"}}>Close</Button>
          <Button variant="contained" sx={{
                borderColor: '#003974',
                borderRadius: '40px',
                padding: '5px 10px',}} onClick={handleLogin}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}