import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const DashBoardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  color: #fff;
`;

export const DashContent = styled.div`
  background: #333;
  width: 220px;
  padding: 20px;
  box-sizing: border-box;
  display: ${({openmenu}) => openmenu === "true" ? "flex" : "none"};
  flex-direction: column;
  justify-content: space-between;
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
  }
`;

export const Link = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
  }
`;
