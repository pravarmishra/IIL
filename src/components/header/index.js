import React, { useContext, useEffect } from "react";
import { ROLES } from "../../constants";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarBrand,
  Nav,
} from "reactstrap";
import { isEmail } from "validator";

import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Avatar, Fab, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AddCircle, ChargingStationRounded, Email, Engineering, Home, ListAltSharp, ManageAccounts, ManageSearch, ManageSearchTwoTone, Search, Sell, TrackChanges, Warehouse } from "@mui/icons-material";
import { AuthContext } from "../contextAPI/ContextAPI";
import BallotIcon from '@mui/icons-material/Ballot';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const StyledNavBar = styled(Navbar)`
  font-family: "Montserrat";
  
`;

const ArrowSeparator = styled.span`
  margin: 0 8px;
  color: #777;
`;


const AccountNameContainer = styled.div`
  display: flex;
  // justify-content: space-between;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  ${(props) =>
    props.height &&
    `
    height: ${props.height}px !important;
    width: ${props.height}px !important;
  `}
`;

const FabStyle = styled(Fab)`
  && {
    z-index: 1};
  }
`;

// role: test && test['quotation generation']?.read?[auth.user.role] : [],

export const getNavItems = (auth) => {

  // let test = [];
  // test = auth?.permissions?.filter((val) => val.role === auth.user.role)[0]

  const myItems = [
    
    {
      title: "Category Data",
      icon: BallotIcon,
      link: "/category",
      role: ["SI"],
    },{
      title: "Farmer Mapping",
      icon: AgricultureIcon,
      link: "/farmermapping",
      role: ["SI"],
    },
    {
      title: "Retailer Mapping",
      icon: WarehouseIcon,
      link: "/retailermapping",
      role: ["SI"],
    },
  ];

  const filteredCards = myItems.filter((card) =>
    {
          return card.role.includes( auth?.user?.profile__c)}
        );

  return filteredCards;
}

const isMobile = window.innerWidth < 900;

const Dot = styled.span`
  position: relative;
  display: inline-block;
  margin: 0 8px;
  color: black;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 7px;
    transform: translateY(-140%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #777;
  }
  
`;

const Separator = styled.span`
  height: 1px;
  width: 15px;
  background-color: #777;
  display: inline-block;
  margin: 0 8px;
`;


const StyledDropdownToggle = styled(DropdownToggle)`
  && {
    color: black;
    text-decoration: none;
    padding: 5px;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;



const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  padding: 5px;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.active &&
    `
      font-weight: bold;
    `}

  &:hover {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
`;

const Header = (props) => {
  
  const { auth, setAuth } = useContext(AuthContext);
  let test = [];
  test = auth?.permissions?.filter((val) => val.role === auth.user.role)[0]



  const location = useLocation();

  useEffect(() => {
    // console.log("checkinggg", props);
  }, [location])
  // test && test['warehouse management']?.read?[auth.user.role] : []

  const navItems = getNavItems(props)

  const onClickLogout = async () => {
    try {
      await window.Platform.database.logOut();
      props.onAuthUserChanged && props.onAuthUserChanged();
    } catch (error) {
      window.NotificationUtils.showError("Something Went Wrong");
    }
  }

  const onClickForgotPassword = async () => {
    try {
      if (!props?.user?.email || !isEmail(props?.user?.email)) {
        window.NotificationUtils.showError("Please enter a valid email address");
        return;
      }
      let response = await window.requestPasswordReset(props?.user?.email);
      window.NotificationUtils.showSuccess("Password reset email sent successfully");
    } catch (error) {
      window.NotificationUtils.showError("Something went wrong");
    }
  };
console.log("PROPPSSS",props)

  const getUserName = () => {
    let name = `${props?.user?.name__c}
   
    `;
    let length = 25;
    if (name.length > length) {
      name = name.substring(0, length - 3) + "...";
    }
    return name;
  }

  return (
    <StyledNavBar color="white" expand="lg">
      <NavbarBrand href="/dashboard" className="mr-auto nav-item">
        <Tooltip title="Home">

          <FabStyle color="primary" aria-label="add" size="small">
            <Home />
          </FabStyle>
        </Tooltip>
      </NavbarBrand>
      <Nav className="ml-auto" navbar >
        {navItems.map((navItem,index) => {

          return (
            <li className="nav-item" key={navItem.link}>
              <StyledNavLink
                to={navItem.link}

                className={`nav-link${location?.pathname.includes(navItem.link)
                  ? " active"
                  : ""
                  }`}
              >
                {navItem.title}
              </StyledNavLink>
              {/* <Dot /> */}
              {/* <Separator/>
               */}
            </li>
          );
        })}

        <UncontrolledDropdown nav inNavbar>
          <StyledDropdownToggle nav caret >
            My Account
          </StyledDropdownToggle>
          <DropdownMenu right>
            <DropdownItem style={{ padding: "10px 12px", fontWeight: "600", color: "black" }}>
              <AccountNameContainer>
                {/* <StyledAvatar height={30} src={props.user?.profilePicURL || ""} />{" "} */}
                <div style={{ marginLeft: "10px" }}>
                  {props?.user?.name__c}{"("+props?.user?.profile__c+")"}
                </div>
              </AccountNameContainer>
            </DropdownItem>
            <DropdownItem divider />
            {/* <DropdownItem
              style={{ fontWeight: "600", color: "black" }}
              onClick={() => props.setShowNotifications(true)}
            >
              Notifications{" "}
              {/* {props.user.notifications && props.user.notifications.length
                ? `(${props.user.notifications.length})`
                : ""} */}
            {/* </DropdownItem> */}
            <DropdownItem divider /> 
            
            <DropdownItem
              style={{ fontWeight: "600", color: "black" }}
              onClick={onClickLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <AccountNameContainer style={{
          fontSize: "0.8em",
          marginLeft: "0.5em",
          color: "gray"
        }}> v1.0</AccountNameContainer>

      </Nav>
    </StyledNavBar>
  );
};

export default Header;
