import React, { useContext, useState } from "react";
import { isEmail } from "validator";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Fab
} from "@mui/material";
import styled from "styled-components";
import { AuthContext } from "../../components/contextAPI/ContextAPI";
import { LOCAL_STORAGE_KEYS } from "../../constants";
import OTPModal from "../../components/modals/OTPmodal";

const FabStyle = styled(Fab)`
  && {
    z-index: 1};
  }
`;

const CenterContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const CenterRow = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
`;

const InputFieldContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LoginCard = styled(Card)`
  width: 100%;
  border-radius: 4px;
`;

const StyledCardContent = styled(CardContent)`
  padding: 20px !important;
`;

const Logo = styled.img`
  height: 100px;
  margin-bottom: 10px;
`;

const HeaderContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledForgotPassword = styled(Typography)`
  cursor: pointer;
  text-align: right; /* Add this line to align the text to the right */
`;

const StyledHeading = styled(Typography)`
  font-weight: bold;
`;

const Login = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [username, setUserName] = React.useState()
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showOTPmodal, setShowOTPModal] = React.useState(false)


  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

 

  const checkForErrors = () => {
    if (!username ) {
      window.NotificationUtils.showError(
        "Please enter a valid email and password"
      );
      return true;
    }
    return false;
  };

  let contextState = { ...auth };
  // const handleOTPRequest = async () => {
  //   let mobile = +username
  //   console.log("no.", mobile);
  //   if (mobile.length < 10 || mobile.length > 10||!mobile) {
  //     window.NotificationUtils.showError("Wrong Credentials, Please Enter 10 digit Mobile number")
  //   }
  //   else {
  //     try {
        
  //       // setIsloader(true)
  //       setShowOTPModal(true)
  //       const data = { username:mobile,signatureId:"t22jBsJWGmZ" }
  //       const response = await window.Platform.database.sendOTP(data);
  //       console.log("response", response);

  //       // setIsloader(false)
  //       contextState.loading = true;
  //       if (!response.hasError) {
  //         setShowOTPModal(true)
  //       }
  //       // else {
  //       //   console.log("error");
  //       //   window.NotificationUtils.showError("username not registered ")
  //       // }
  //     } catch (error) {
  //       contextState.loading = true;
  //       console.error(error);
  //       window.NotificationUtils.showError("Something went wrong, please try again ")
  //     }
  //   }
  // }

  const handleOTPRequest = async () => {
    let mobile = username
    console.log("no.", mobile);
    if (mobile.length < 10 || mobile.length > 10) {
      window.NotificationUtils.showError("Wrong Credentials, Please Enter 10 digit Mobile number")
    }
    else {
      try {
        // setIsloader(true)
        // setShowOTPModal(true)
        const data = { username,signatureId:"t22jBsJWGmZ" }
        const response = await window.Platform.database.sendOTP(data);
        console.log("response", response);

        // setIsloader(false)

        if (!response.hasError) {
          setShowOTPModal(true)
        }
        // else {
        //   console.log("error");
        //   window.NotificationUtils.showError("username not registered ")
        // }
      } catch (error) {
        // setIsloader(false)
        console.error(error);
        window.NotificationUtils.showError("Something went wrong, please try again ")
      }
    }
  }





  const handleInputChange = (event) => {
    const value = event.target.value;

    console.log("VALUEEE",value)
    const regex = /^[0-9]{0,10}$/;

    if (regex.test(value)) {
      setUserName(value);
    }
  };

  const renderLoginCard = () => {
    return (
      <LoginCard raised>
        <StyledCardContent>
          <HeaderContainer>
            <StyledHeading variant="h5" align="left">
              Login
            </StyledHeading>
          </HeaderContainer>
          <InputFieldContainer>
          {/* <TextField
              margin="normal"
              required
              fullWidth
              // type='number'
              value={username}
              label="Mobile Number"
              autoFocus
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              onKeyDown={(e) => {
                if (e && e.key && e.key === "Enter") {
                  handleOTPRequest();
                }
              }}
              onChange={handleInputChange }
            /> */}
              <TextField
              margin="normal"
              required
              fullWidth
              type='number'
              value={username}
              label="Mobile Number"
              autoFocus
              onChange={(event) => setUserName(event.target.value)}
            />
          </InputFieldContainer>
          <InputFieldContainer>
            {/* <TextField
              variant="outlined"
              fullWidth={true}
              label="Password"
              type="password"
              onChange={handlePasswordChange}
              onKeyDown={(e) => {
                if (e && e.key && e.key === "Enter") {
                  onClickLogin();
                }
              }}
              error={!isPasswordValid}
              helperText={passwordErrorMessage}
            /> */}
          </InputFieldContainer>
          {/* <InputFieldContainer>
            <StyledForgotPassword
              color="secondary"
              onClick={onClickForgotPassword}
              align="right"
              variant="subtitle2"
            >
              Forgot Password ?
            </StyledForgotPassword>
          </InputFieldContainer> */}
          <LoginButtonContainer>
            {/* Disable the login button if the password is not valid */}
            <FabStyle
              variant="extended"
              color="primary"
              onClick={handleOTPRequest}
             
          >
              Send OTP
            </FabStyle>
          </LoginButtonContainer>
        </StyledCardContent>
      </LoginCard>
    );
  };

  const renderLogo = () => {
    return <Logo src="./iillogo.png" />;
  };

  return (
    <CenterContent>
      <CenterRow>
        {renderLogo()}
        {renderLoginCard()}
      </CenterRow>
      {
        showOTPmodal && <OTPModal onClose={setShowOTPModal} username={username} props={props} />
      }
    </CenterContent>
  );
};

export default Login;
