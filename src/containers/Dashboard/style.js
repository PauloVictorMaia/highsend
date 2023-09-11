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
  height: calc(100% - 66px);
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
  border-right: 1px solid #f2f2f2;
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
  height: 60px;
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding: 10px;
  border-radius: 14px;
  border: ${({ active }) => active? "1px solid #F26800" : "none"};
  color: ${({ active }) => active? "#F26800" : "#14140f"};

  &:hover {
    background-color: #f2f2f2;
  }

  span {
    margin: 0 0 0 5px;
    font-size: 18px;
    margin-left: 25px;
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

export const Divider = styled.div`
 width: 100%;
 border-bottom: 1px solid #bfbfbf;
 margin: 40px 0;
`;
