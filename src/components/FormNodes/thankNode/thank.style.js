import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 40px;
  color: #333;
  display: Flex;
  align-items: center;
  border: 0.5px solid rgba(0,0,0,0.15);
  background-color: #fff;
  border-radius: 8px;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  position: relative;
`;

export const InputPreview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

export const InputConfig = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 300px;
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  left: -325px;
  top: -40px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);

  >span {
    font-size: 1rem;
    text-align: left;
  }

  >select {
    margin-top: 5px;
    height: 30px;
    border: 0.5px solid rgba(0,0,0,0.15);
    border-radius: 3px;
    outline: none;
    font-family: 'Oswald', sans-serif;
    font-size: 16px;
    color: #333;

    &:focus {
      outline: 2px solid #9999FF;
    }
  }

  >div {
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 10px
  }
`;

export const MenuInput = styled.input`
  width: ${({width}) => width};
  height: 40px;
  border-radius: 3px;
  color: #333;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  padding-left: 10px;
  box-sizing: border-box;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  margin: 5px 0 10px 0;

  &:focus {
    outline: 2px solid #9999FF;
  }
`;

export const MenuButton = styled.button`
  display: flex;
  height: 30px;
  width: 60px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #4339F2;
  color: #fff;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 5px 0 10px 0;
  cursor: pointer;
`;

export const CustomToolbar = styled.div`
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  width: 30px;
  height: 30px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 3px;
  position: absolute;
  top: -35px;
  right: 30px;
`;

export const CloseButton = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: #ff4d4d;
  padding: 2px;
  position: absolute;
  top: -5px;
  right: -5px;
  cursor: pointer;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;