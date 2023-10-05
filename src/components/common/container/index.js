import React from 'react'
import styled from "styled-components";

const ShortcutCard = styled(Card)`
  width: 250px;
  height: 200px;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 0px;
  &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`

const StyledCardContent = styled(CardContent)`
  padding: 20px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardHeaderContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledCardHeading = styled(Typography)`
  text-transform: none;
  letter-spacing: 0.5px;
`

const CardIcon = styled(ManageAccounts)`
  font-size: 112px;
  color: #E1714C;
`;

const ContentContainer = styled.div`
  padding: 20px;
  top: 64px;
  right:0;
  width:100%;
  ${(props) => !props.isMobile && `max-height: calc(100% - 64px);`}
  // overflow:unset;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  gap: 35px;
  ${(props) => props.isMobile && `align-items:center;`}
  flex-wrap:wrap;
  background:none !important;
`;

const isMobile = window.innerWidth < 900;

const Container = (props) => {
  return (
    <div>Container</div>
  )
}

export default Container