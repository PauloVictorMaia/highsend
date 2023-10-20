import { styled } from "styled-components";

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
  top: -40px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);

  >span {
    font-size: 1rem;
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