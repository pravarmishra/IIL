import React, { useContext } from "react";

import Drawer from "../../components/common/drawer/drawer";

import styled from "styled-components";

import Typography from "@mui/material/Typography";

import { NavLink } from "react-router-dom";

import { PRIMARY_COLOR } from "../../constants";
import { AuthContext } from "../../components/contextAPI/ContextAPI";
import { ReactComponent as farmervisit } from "../../icons/Farmer visit.svg"
import { ReactComponent as Retailervisit } from "../../icons/Retailer visit.svg"
import { ReactComponent as Distributorvisit } from "../../icons/Distributor visit.svg"
import BallotIcon from "@mui/icons-material/Ballot";

import CardContent from "@mui/material/CardContent";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import { Card } from "@mui/material";
import { ReactComponent as vanCampaign } from "../../icons/Van Campaign.svg"
import { ReactComponent as spotDemo } from "../../icons/Spot demo.svg"
import { ReactComponent as NormalDemo } from "../../icons/Normal demo.svg"
import { ReactComponent as LpdDemo } from "../../icons/Large plot demo.svg"
import { ReactComponent as FarmerMeet } from "../../icons/Farmer Meet.svg"
import { ReactComponent as Kvkvisit } from "../../icons/kvkvisit.svg"
import { ReactComponent as KrishiMela } from "../../icons/krishimela.svg"
import { ReactComponent as Feedback } from "../../icons/Feedback.svg"

const isMobile = window.innerWidth < 900;
const ShortcutsContainer = styled.div`
  padding: 20px;
        background: "#EEEEEE";
  overflow: auto;

  height: ${isMobile ? "calc(100vh - 125px)" : "calc(100% - 43px)"};

  width: 100%;

  border-radius: 8px;

  border: solid 1px lightGrey;

  display: flex;

  gap: 20px;
  

  padding: 20px;
  // position: ${isMobile ? "relative" : "fixed"};
  top: 64px;
  left: ${isMobile ? `0px` : `240px`};
  
  overflow-y: auto;
  display: flex;
  flex-direction: ${isMobile ? "column" : "row"};
  gap: 20px;
  ${isMobile && `align-items:center;`}
  flex-wrap:wrap;


  ${isMobile &&
  `

    flex-direction:column;

    align-items:center;

    `}
`;


const StaffEditorPageContainer = styled.div`
  height: ${isMobile ? `auto` : `calc(100vh - 82px)`};

  width: 100%;

  background: none;

  padding: 10px 15px;

  ${isMobile &&
  `

    position: relative;

    top:10px;

    `}
`;



const ShortcutCard = styled(Card)`
  width: 250px;
  height: 200px;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 0px;

  &:hover {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`;
const GraphCard = styled(Card)`
  width: ${isMobile ? "95%" : "50%"};
  margin-left: ${isMobile ? "5px" : "0px"};
  height:${isMobile ? "285px" : "290px"}; 
  padding: ${isMobile ? "10px" : "5px"};
`;

const GraphCard1 = styled(Card)`
  width: ${isMobile ? "95%" : "50%"};
  margin-left: ${isMobile ? "5px" : "0px"};
  height:${isMobile ? "340px" : "290px"}; 
  padding: ${isMobile ? "10px" : "5px"};
`;

const DetailCard = styled(Card)`
  width: ${isMobile ? "95%" : "39%"};
  height: 300px;
  display: ${isMobile ? "flex" : "grid"};
  flex-direction: ${isMobile && "column"};
  grid-template-columns: repeat(2, 1fr);
  align-items: ${isMobile ? "left" : "center"};
  justify-items: ${isMobile ? "left" : "center"};
  &:nth-last-child(-n + 5) {
    grid-column: 1 / span 2; /* Display in a single row */
    /* Adjust the width, height, or any other styles as needed */
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${isMobile ? "flex-start" : "space-between"};
  margin-bottom: 10px;
  flex-direction: ${isMobile ? "column" : "row"};
`;

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
`;

const CardIcon = styled(ManageAccounts)`
  font-size: 112px;
  color: #85c225;
`;

const ContentContainer = styled.div`
  padding: 20px;
  // position: ${isMobile ? "relative" : "fixed"};
  top: 64px;
  left: ${isMobile ? `0px` : `240px`};
  width: ${isMobile ? `100%` : `calc(100% - 24px)`};
  ${!isMobile && `max-height: calc(100% - 64px);`}
  overflow-y: auto;
  display: flex;
  flex-direction: ${isMobile ? "column" : "row"};
  gap: 20px;
  ${isMobile && `align-items:center;`}
  flex-wrap:wrap;
`;


const EventManager = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  let test = [];
  test = auth?.permissions?.filter((val) => val.role === auth.user.role)[0];

  // console.log('tessst',test)

 const cardData = [
  {
    link: "/vancampaign",
    title: "Van Campaign",
      icon: vanCampaign,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
   {
    link: "/spotDemo",
      title: "Spot Demo ",
      icon: spotDemo,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
  {
    link: "/normalDemo",
    title: "Normal Demo ",
      icon: NormalDemo,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
  {
    link: "/lpdActivity",
      title: "Large Plot Demo",
      icon: LpdDemo,
    role: ["SI","AM"],
      //  nodeRef: createRef(),
  },
  {
    link: "/farmermeet",
    title: "Farmer Meet ",
    icon: FarmerMeet,
     role: ["SI","AM"],
    //  nodeRef: createRef(),
},
{
    link: "/kvkvisit",
    title: "KVK Visit",
    icon: Kvkvisit,
     role: ["SI","AM"],
    //  nodeRef: createRef(),
},
{
    link: "/krishimela",
    title: "Krishi Mela",
    icon: KrishiMela,
     role: ["SI","AM"],
    //  nodeRef: createRef(),
},
  ];


  const renderCards = () => {
    const filteredCards = cardData.filter((card) => {
      return card.role.includes(props?.user?.profile__c);
    });
    // console.log('ffff', filteredCards)

    return filteredCards.map((card, index) => (
      <ShortcutCard key={index} sx={{ borderRadius: "20px" }}>
        <NavLink to={card.link}>
          <StyledCardContent>
            <CardHeaderContainer>
              <StyledCardHeading variant="h6" align="center">
                {card.title}
              </StyledCardHeading>
            </CardHeaderContainer>
            <CardIcon as={card.icon} sx={{ fontSize: "112px" }} />
          </StyledCardContent>
        </NavLink>
      </ShortcutCard>
    ));
  };
  return (
    <>
      {isMobile && (
        <Drawer
          onAuthUserChanged={props.onAuthUserChanged}
          user={props.user}
          props = {props}
        />
      )}

      <StaffEditorPageContainer>
        <HeaderContainer>
          <Typography variant="h5">Event Report</Typography>

          <div></div>
        </HeaderContainer>

        <ShortcutsContainer style={{background:"#EEEEEE"}}>
          {renderCards()}
        </ShortcutsContainer>
      </StaffEditorPageContainer>
    </>
  );
};

export default EventManager;
