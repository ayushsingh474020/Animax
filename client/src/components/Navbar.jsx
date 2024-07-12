import React, { useState } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { openSignin } from '../redux/setSigninSlice';
import LogoIcon from '../Images/Logo.png'

const NavbarDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center
  width: 100%;
  padding: 16px 40px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  ${'' /* background: ${({ theme }) => theme.bg} */}
  background-color:#1E1F29;
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5.7px);
-webkit-backdrop-filter: blur(5.7px);
@media (max-width: 768px) {
    padding: 16px;
  }

`;
const ButtonDiv = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 70px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:hover{
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Welcome = styled.div`
  font-size: 26px;
  font-weight: 600;
  display: flex;
  align-items:center;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
`;

const Image = styled.img`
  height: 70px;
  margin-right: 15px;
`;


const Navbar = ({  menuOpen, setMenuOpen, setSignInOpen, setSignUpOpen }) => {

  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <NavbarDiv>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </IcoButton>
        <Welcome>
        <Image src={LogoIcon} />
          <span style={{color:"white"}}>ani-</span><span style={{fontSize:"3rem",color:"#C69749"}}>MAX</span>
        </Welcome>
      {
        currentUser ? <>
          <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Avatar src={currentUser.img} >{currentUser.name.charAt(0).toUpperCase()}</Avatar>
          </Link>
        </>
          :
          <ButtonDiv onClick={() => dispatch(openSignin())}>
            <PersonIcon style={{ fontSize: "18px" }} />
            Login
          </ButtonDiv>
      }
    </NavbarDiv>
  )
}

export default Navbar