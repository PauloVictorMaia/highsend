import { styled } from "styled-components";
import { Handle } from "reactflow";

export const NodeContainer = styled.div`
  width: 100%;
  height: 100%;
  color: #333;
  display: Flex;
  align-items: center;
  border: 0.5px solid rgba(0,0,0,0.15);
  background-color: #fff;
  border-radius: 8px;
  padding: 0 0 0 10px;
  box-sizing: border-box;
`;

export const InputPreview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;

  > input {
    font-family: 'Oswald', sans-serif;
    font-size: 16px;
    color: #333;
  }
`;

export const InputConfig = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 300px;
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  left: -325px;
  top: -60px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);

  >span {
    font-size: 1rem;
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

export const RightHandle = styled(Handle)`
  width: 10px;
  height: 10px;
  background-color: rgba(153, 51, 255);
  right: -29px;
`;

export const MultipleChoiceInput = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
`;

export const MenuInput = styled.input`
  width: ${({width}) => width};
  height: 32px;
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