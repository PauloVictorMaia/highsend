import { useState, useRef } from 'react';
import styled from 'styled-components';
import AvatarImage from '../../assets/avatar.jpg'
import { useStateContext } from '../../contexts/ContextProvider';
import MenuIcon from '@mui/icons-material/Menu';

const TopBarWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
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
  height: 40px;
  width: 40px;
  text-align: center;
  font-size: 28px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: #F26800;
  color: #fff;
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
 background-color: #f2f2f2;
 display: flex;
 height: 50px;
 width: 180px;
 border-radius: 8px;
 justify-content: center;
 align-items: center;
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
          <Avatar alt="User Avatar">P</Avatar>
          <UserName>Nome do Usuário</UserName>
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
