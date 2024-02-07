import { styled } from "styled-components";

export const Container = styled.div`
  width: 60px;
  border-radius: 8px;
  border: 0.5px solid rgba(0,0,0,0.15);
  box-shadow: 0 5px 7px 0 (rgba(0,0,0,0.15));
  background-color: #fff;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  padding: 5px 3px;
  box-sizing: border-box;
  padding: 5px;
  position: relative;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;

  &:disabled {
    opacity: 0.5;
  }

  >svg {
    color: ${({color}) => color ? "#E67200" : "#333"};
    width: 70%;
    height: auto;
    font-size: small;
  }
`;

export const Label = styled.span`
  font-size: 10px;
  color: #333;
  color: ${({color}) => color ? "#E67200" : "#333"};
`;

export const SwitchContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  >span {
    color: #333;
    font-size: 10px;
  }
`;