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
import OpaqueLoading from "../../components/opaqueLoading/opaqueLoading";

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
  const [password, setPassword] = React.useState('')
const [view,setView] = useState(false)
  const [username, setUserName] = React.useState()
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  // const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showOTPmodal, setShowOTPModal] = React.useState(false)
const [loading,setLoading]=useState(false)

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
        setLoading(true)
        // setIsloader(true)
        // setShowOTPModal(true)
        const data = { username,signatureId:"t22jBsJWGmZ" }
        console.log("DATA",data)
        const response = await window.Platform.database.sendOTP(data);
        console.log("response", response);

        // setIsloader(false)

        if (!response.hasError) {
          setView(true)
        }
        setLoading(false)
        // else {
        //   console.log("error");
        //   window.NotificationUtils.showError("username not registered ")
        // }
      } catch (error) {
        // setIsloader(false)
        console.error(error);
        window.NotificationUtils.showError("Something went wrong, please try again ")
        setLoading(false)
     
      }
    }
  }

  const handleLogin = async () => {
    const data = {
      username, password:password
    }
    // setIsloader(true)
    console.log("send data", data);
    if (password.length !== 6) {
      // setIsloader(false)
      window.NotificationUtils.showWarning("Please fill the Credentials")
    }
    else {
      try {
        setLoading(true)
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
        setLoading(false)

    
          window.NotificationUtils.showSuccess("Logged In Successfully");
        } catch (error) {
          if (error && error.code === 101) {
            window.NotificationUtils.showError("Invalid Username/Password");
          } else {
            window.NotificationUtils.showError("Something Went Wrong");
          }
        } finally {
          contextState.loading = false;
        setLoading(false)

        }
      };

  }




  const handleInputChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, '');

    console.log("VALUEEE",sanitizedValue)
    // const regex = /^[0-9]{0,10}$/;
    setUserName(sanitizedValue);
    // if (regex.test(value)) {
    //   setUserName(value);
    // }
  };
  const handleChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    // console.log("newValue",e.target.value)
    setPassword(sanitizedValue)
  }
console.log("USERNAMe",username)
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
              // type='number'
              InputProps={{
                inputProps: {
                  pattern: '[0-9]*', 
                },
              }}
              value={username}
              label="Mobile Number"
              autoFocus
              onKeyDown={(e) => {
                if (e && e.key && e.key === "Enter") {
                  handleOTPRequest();
                }
              }}
              // onChange={(event) => setUserName(event.target.value)}
              onChange={handleInputChange}
      
            />
          </InputFieldContainer>
          {view&&<InputFieldContainer>
          <TextField fullWidth    label="OTP"
          required
            onKeyDown={(e) => {
              if (e && e.key && e.key === "Enter") {
                handleLogin();
              }
            }}
            InputProps={{
              inputProps: {
                pattern: '[0-9]*', 
              },
            }}
            value={password}
          onChange={handleChange} />
          
          </InputFieldContainer> }
          <LoginButtonContainer>
            {/* Disable the login button if the password is not valid */}
            {!view?<FabStyle
              variant="extended"
              color="primary"
              onClick={handleOTPRequest}
              disabled={loading}
             
          >
              Send OTP
            </FabStyle>:
            <FabStyle
              variant="extended"
              color="primary"
              onClick={handleLogin}
              disabled={loading}

             
          >
             Login
            </FabStyle>}
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
        {loading&&<OpaqueLoading/>}
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
