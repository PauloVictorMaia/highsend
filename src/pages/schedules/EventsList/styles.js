import { styled } from "styled-components";

export const Container = styled.div`
  color: #000;
  padding: 20px 0;
  box-sizing: border-box;
`;

export const  MenuContainer = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  border: 0.5px solid rgba(0,0,0,0.15);
`;

export const EndList = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(26, 26, 26, 0.61);
`;

export const Calendars = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  background-color: #fff;
  position: relative;

  >button {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    outline: none;
    border: none;
    background-color: #F26800;
    color: #fff;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    margin: 10px 0;
  }
`;