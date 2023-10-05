import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import FileUploader from "react-firebase-file-uploader";
import { Avatar, Typography } from "@mui/material";

const ImageUploader = styled.label``;

const PreviewContainer = styled.div`
  width: ${(props) => (props.height ? props.height : 100)}px;
  height: ${(props) => (props.height ? props.height : 100)}px;
  border-radius: 50%;
  border: solid 1px #e3e3e3;
  overflow: hidden;
  position: relative;
  ${(props) => !props.disabled && "cursor: pointer;"}
`;

const ImagePreview = styled(Avatar)`
  height: ${(props) => props.height}px !important;
  width: ${(props) => props.height}px !important;
`;

const ProgressContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
`;

const UploadTextContainer = styled.div`
  position: absolute;
  top: ${(props) => props.uploadTextStyle.top}%;
  left: ${(props) => props.uploadTextStyle.left}%;
`;

const ProfilePictureUploader = (props) => {
  const [isUploading, setIsUploading] = useState(false);

  const height = props.height || 100;

  const uploadTextStyle = props.uploadTextStyle || { top: 40, left: 28 };

  const imageURL = props.url ? props.url : "";

  const [progress, setProgress] = useState(0);

  const disabled = props.disabled ? props.disabled : false;

  const handleUpload = async () => {
    try {
      let uploadInput = document.getElementById("photo-upload");
      if (uploadInput) {
        if (uploadInput.files.length > 0) {
          handleUploadStart();
          let file = uploadInput.files[0];
          let response = await window.Platform.database.profilePictureUpload(file);
          if(response._url){
            handleUploadSuccess(response._url);
          }
        }
      }
    } catch (error) {
      console.error(error);
      handleUploadError();
    }
  };

  const initializeUploadChangeTrigger = () => {
    window.$("#photo-upload").on("change", handleUpload);
  };

  useEffect(() => {
    initializeUploadChangeTrigger();
  }, []);

  const handleUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  };

  const handleUploadError = () => {
    window.NotificationUtils.showError("Error Uploading Image");
    setIsUploading(false);
    window.$("#photo-upload").value = "";
  };

  const handleUploadSuccess = (url = "") => {
    setProgress(100);
    setIsUploading(false);
    window.$("#photo-upload").value = "";
    props.onUploadSuccess && props.onUploadSuccess("profilePicURL", url);
  };

  return (
    <div>
      <ImageUploader htmlFor="photo-upload">
        <PreviewContainer disabled={disabled} height={height}>
          <ImagePreview height={height} src={imageURL ? imageURL : ""} />
          {isUploading && (
            <ProgressContainer>
              <Typography
                align="center"
                variant="body2"
              >{`${progress}%`}</Typography>
            </ProgressContainer>
          )}
          {!isUploading && !imageURL && (
            <UploadTextContainer uploadTextStyle={uploadTextStyle}>
              <Typography align="center" variant="body2">
                Upload 
              </Typography>
            </UploadTextContainer>
          )}
        </PreviewContainer>
        <input
          hidden
          accept="image/png, image/gif, image/jpeg"
          type="file"
          id="photo-upload"
          disabled={isUploading || disabled}
          maxSize={52428800}
        ></input>
      </ImageUploader>
    </div>
  );
};

export default ProfilePictureUploader;
