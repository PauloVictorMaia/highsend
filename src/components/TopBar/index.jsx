import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useStateContext } from '../../contexts/ContextProvider';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';
import { Img } from 'react-image';
import IconLogo from '../../assets/SVGComponents/iconLogo';
import TextLogo from '../../assets/SVGComponents/textLogo';
import { Link } from 'react-router-dom';

const TopBarWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 45px 0 40px;
  box-sizing: border-box;
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
  background-color: #4339F2;
  color: #fff;
`;

export const ProfileImage = styled(Img)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
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
 column-gap: 10px;
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
  const { openMenu, signOut, user, nodeMenuIsOpen, setNodeMenuIsOpen, setOpenMenu } = useStateContext();
  const navigate = useNavigate();

  const handleIconContainerClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setTimeout(() => {
        handleCloseDropdown();
      }, 100);
    }
  };

  return (
    <TopBarWrapper onClick={() => setNodeMenuIsOpen(!nodeMenuIsOpen)}>
      <Link to="/dashboard/fluxograms">
        <LogoContainer onMouseMove={() => setOpenMenu(true)} onMouseLeave={() => setOpenMenu(false)}>
          {/* <IconContainer onClick={() => setOpenMenu(!openMenu)} >
          <MenuIcon />
        </IconContainer> */}
          <IconLogo />
          {openMenu && <TextLogo />}
        </LogoContainer>
      </Link>
      <UserMenu>
        <Tooltip title="Notificações">
          <UserIconContainer>
            <NotificationsNoneIcon />
          </UserIconContainer>
        </Tooltip>
        <Tooltip title="Suporte">
          <UserIconContainer>
            <ChatBubbleOutlineIcon />
          </UserIconContainer>
        </Tooltip>
        <UserIconContainer
          onClick={() => handleIconContainerClick()}
        >
          <Avatar>
            {
              Object.keys(user).length > 0 &&
              !user.profileImage &&
              user.name.charAt(0).toUpperCase()
            }
            {
              user && user.profileImage &&
              <ProfileImage
                src={user.profileImage}
                alt="Imagem de perfil"
              />
            }
          </Avatar>
        </UserIconContainer>
        {isDropdownOpen && (
          <Dropdown ref={dropdownRef} isOpen={isDropdownOpen}>
            <MenuItem
              onClick={() => {
                navigate('/dashboard/profile')
                setIsDropdownOpen(false)
              }}

            >
              Meu perfil
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Sair</MenuItem>
          </Dropdown>
        )}
      </UserMenu>
    </TopBarWrapper>
  );
};

export default TopBar;
