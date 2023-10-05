import { Button, Dialog, DialogContent, Typography } from '@mui/material'
import React,{Component} from 'react';
import styled from "styled-components";

const QuestionText = styled(Typography)`
    text-transform:none;
    font-size:16px;
`

const CancelButton = styled(Button)`
    margin-right:20px !important;
`

const ButtonsContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:center;
    margin-top:10px;
`

const StyledDialogContent = styled(DialogContent)`
    padding:16px !important;
`

export default class CustomConfirmModal extends Component{
    constructor(){
        super();
        this.state={
            open:false,
            message:"",
            extras:{}
        }
    }

    show = (message,confirmCallback,cancelCallback,extras) => {
        let newDetails = {};
        if(message){
            newDetails.message = message;
        }
        if(confirmCallback){
            this.confirmCallback = confirmCallback;
        }
        if(cancelCallback){
            this.cancelCallback = cancelCallback;
        }
        if(extras){
            newDetails.extras = extras;
        }
        this.setState({
            ...newDetails,
            open:true
        })
    }

    closeModal = () => {
        this.setState({
            open:false,
            message:"",
            extras:{}
        })
        this.confirmCallback = null;
        this.cancelCallback = null;
    }

    onClickConfirm = () => {
        if(this.confirmCallback){
            this.confirmCallback();
        }
        this.closeModal();
    }

    onClickCancel = () => {
        if(this.cancelCallback){
            this.cancelCallback();
        }
        this.closeModal();
    }

    render(){
        return (
          <Dialog maxWidth="xs" fullWidth={true} open={this.state.open}>
            {this.state.open && (
              <StyledDialogContent>
                <QuestionText variant="subtitle1">
                  {this.state.message}
                </QuestionText>
                <ButtonsContainer>
                  <CancelButton
                    onClick={this.onClickCancel}
                    color="primary"
                    variant="contained"
                  >
                    {this.state.extras && this.state.extras.cancelButtonText
                      ? this.state.extras.cancelButtonText
                      : "Close"}
                  </CancelButton>
                  <Button
                    onClick={this.onClickConfirm}
                    color="primary"
                    variant="contained"
                  >
                    {this.state.extras && this.state.extras.confirmButtonText
                      ? this.state.extras.confirmButtonText
                      : "Yes"}
                  </Button>
                </ButtonsContainer>
              </StyledDialogContent>
            )}
          </Dialog>
        );
            };
}
