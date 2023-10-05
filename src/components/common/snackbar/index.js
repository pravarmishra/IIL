import { createTheme } from "@mui/material/styles";
import styled from "styled-components";
const { Snackbar, Alert } = require("@mui/material");

const { useState, forwardRef, useImperativeHandle } = require("react")

// import { styled } from '@mui/styles';


// const theme = createTheme();

const RootContainer = styled.div`
  width: 100%;
  align-items: center;
`;

const SnackbarWrapper = forwardRef((props, ref) => {

    const [open, setOpen] = useState(false);

    const [notify, setNotify] = useState({});

    useImperativeHandle(ref, () => ({

        showSuccess(msg, extras) {

            setOpen(true);

            setNotify({

                severity: 'success',

                message: msg,

                extras

            })

        },

        showError(msg, extras) {

            setOpen(true);

            setNotify({

                severity: 'error',

                message: msg,

                extras

            })

        },

        showWarning(msg, extras) {

            setOpen(true);

            setNotify({

                severity: 'warning',

                message: msg,

                extras

            })

        },

        showInfo(msg, extras) {

            setOpen(true);

            setNotify({

                severity: 'info',

                message: msg,

                extras

            })

        }

    }))




    const handleClose = (_, reason) => {

        if (reason === "clickaway") {

            return

        }

        setOpen(false);

    }

    return (

        <RootContainer>

        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>

            <Alert onClose={handleClose} severity={notify.severity}>{notify.message}</Alert>

        </Snackbar>
        </RootContainer>

    )

})

   

export default SnackbarWrapper;

