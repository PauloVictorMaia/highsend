import { styled } from "styled-components";
import InputMask from 'react-input-mask';

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

export const Label = styled.div`
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
  top: -20px;
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
    margin: 5px 0;
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
`;

export const InputConfigButton = styled.button`
  width: 170px;
  height: 40px;
  border-radius: 5px;
  background-color: #4339F2;
  outline: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MessageInput = styled.textarea`
  display: block;
  width: 100%;
  height: 150px;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  font-family: 'Oswald', sans-serif;
  display: block;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
  scrollbar-width: thin; 
  scrollbar-color: #888 #f0f0f0;

  &:focus {
    outline: 2px solid #9999FF;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
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

export const SwitchContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  >span {
    color: #333;
    font-size: 0.9rem;
  }
`;

export const Input = styled(InputMask)`
  border: none;
  outline: none;
  color: #333;
  width: 70px;

  &::placeholder {
    opacity: 0.5;
  }
`;

export const SpecificMomentContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  height: 30px;
`;

export const SpecificDateContent = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  height: 30px;

  svg {
    font-size: medium;
    color: #333;
  }
`;

export const TimeInput = styled.input`
  line-height: 20px;
  font-family: 'Poppins', sans-serif;
  outline: none; 
  border: none;
`;

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  select {
    height: 30px;
    width: 100%;
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

  input {
    height: 30px;
    width: 98%;
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
`;

export const DaysOfTheWeekContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export const PeriodContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
`;