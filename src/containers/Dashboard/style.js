import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
 width: 100%;
 height: 100vh;
 position: fixed;
`;

export const DashBoardContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 56px);
  color: #159A9C;
`;

export const DashContent = styled.div`
  background: #fff;
  width: ${({openmenu}) => openmenu ? '220px' : '80px'};
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const IconContainer = styled.div`
 position: fixed;
 background-color: #000;
 width: 40px;
 height: 40px;
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius: 50%;
 left: 198px;
 top: 10;
 z-index: 100000000;
 cursor: pointer;
`;

export const MenuContainer = styled.div`
  
`;

export const IconsContainer = styled.div`
  justify-content: space-around;
  display: flex;
  padding: 0 20px;
`;

export const HamburguerMenu = styled.div`
 
`;

export const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding: 4px 0 4px 10px;
  border-radius: 4px;
  transition: .5s;

  &:hover {
    background-color: rgba(255,255,255, 0.1);
  }

  span {
    margin: 0 0 0 5px;
    font-size: 17px;
    margin-left: 15px;
    display: ${({openmenu}) => openmenu ? 'block' : 'none'};
  }
`;

export const Link = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
  }
`;
