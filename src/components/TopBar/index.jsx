import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AvatarImage from '../../assets/avatar.jpg'
import { useStateContext } from '../../contexts/ContextProvider';
import CloseIcon from '@mui/icons-material/Close';

const TopBarWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Avatar = styled.img`
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
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
 width: 40px;
 height: 40px;
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius: 50%;
 cursor: pointer;
`;

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { openMenu, setOpenMenu } = useStateContext();

  return (
    <TopBarWrapper>
      <LogoContainer>
        <IconContainer onClick={() => setOpenMenu(!openMenu)} >
          <CloseIcon />
        </IconContainer>
        <span>Hiflow</span>
      </LogoContainer>
      <UserMenu onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Avatar src={AvatarImage} alt="User Avatar" />
        <UserName>Nome do Usuário</UserName>
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
