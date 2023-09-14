import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useStateContext } from '../../contexts/ContextProvider';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const TopBarWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Avatar = styled.div`
  height: 35px;
  width: 35px;
  text-align: center;
  font-size: 23px;
  border-radius: 50%;
  background-color: #F26800;
  color: #fff;
`;

const Dropdown = styled.div`
  position: absolute;
  width: 200px;
  top: 48px;
  right: 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 100;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const LogoContainer = styled.div`
 display: flex;
 align-items: center;
`;

const IconContainer = styled.div`
 width: 30px;
 height: 30px;
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius: 50%;
 cursor: pointer;
 margin-right: 30px;

 &:hover{
  background-color: #f2f2f2;
 }
`;

export const UserIconContainer = styled.div`
 display: flex;
 height: 50px;
 padding: 0 10px;
 border-radius: 8px;
 justify-content: center;
 align-items: center;
 margin-right: 15px;

 &:hover{
  background-color: #f2f2f2;
 }
`;

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { openMenu, setOpenMenu } = useStateContext();

  return (
    <TopBarWrapper>
      <LogoContainer>
        <IconContainer onClick={() => setOpenMenu(!openMenu)} >
          <MenuIcon />
        </IconContainer>
        <span>Hiflow</span>
      </LogoContainer>
      <UserMenu onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <UserIconContainer>
          <NotificationsNoneIcon />
        </UserIconContainer>
        <UserIconContainer>
          <ChatBubbleOutlineIcon />
        </UserIconContainer>
        <UserIconContainer>
          <Avatar alt="User Avatar">P</Avatar>
        </UserIconContainer>
        {isDropdownOpen && (
          <Dropdown ref={dropdownRef} isOpen={isDropdownOpen}>
            <MenuItem>Meu Canal</MenuItem>
            <MenuItem>Histórico</MenuItem>
            <MenuItem>Sair</MenuItem>
          </Dropdown>
        )}
      </UserMenu>
    </TopBarWrapper>
  );
};

export default TopBar;