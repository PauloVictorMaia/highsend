import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
 width: 100%;
 height: 100vh;
 position: fixed;
 background-color: #F8F8F8;
`;

export const DashBoardContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 76px);
`;

export const DashContent = styled.div`
  background: #fff;
  width: ${({openmenu}) => openmenu ? '230px' : '100px'};
  transition: width 0.5s ease;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 700px;
  max-height: 100%;
  border-radius: 0 0 15px 0;
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
  color: ${({ active }) => active? "#1B192E" : "#A0B4D1"};
  font-family: 'Poppins', sans-serif;
  position: relative;

  &:hover {
    background-color: #f2f2f2;
  }

  div {
    min-width: 50px;
    min-height: 50px;
    border-radius: 8px;
    background-color: ${({ active }) => active? "#E0EAFF" : "#F8F8F8"};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    font-size: 16px;
    margin-left: 15px;
    display: ${({openmenu}) => openmenu ? 'block' : 'none'};
    white-space: nowrap;
    max-width: 100%;
    overflow-x: hidden;
  }

  .shortly {
    position: absolute;
    font-size: 10px;
    top: 3px;
    right: 10px;
    color: #bfbfbf;
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
 margin: 30px 0;
`;
