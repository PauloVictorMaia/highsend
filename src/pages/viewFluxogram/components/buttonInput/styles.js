import styled, { keyframes } from 'styled-components';

const appear = keyframes`  
  0% {
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  99% {
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  100% {
    opacity: 1;
    width: auto;
    height: auto;
  }
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  margin: 5px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  outline: none;
  border: none;
  text-align: center; 
  font-size: 17px;
  font-weight: 400;
  max-width: 100%;
  word-wrap: break-word;
  background: ${props => props.selected ? '#4A47A3' : '#EDEDED'};
  color: ${props => props.selected ? 'white' : '#333333'}; 
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, background-color 0.2s;
  animation: 2s ${appear} forwards;

  &:hover {
    transform: scale(1.03);
    background-color: ${props => !props.selected && '#DADADA'}; 
  }
`;

export const Text = styled.div`
 margin-top: 10px;
 padding: 10px 20px;
 cursor: pointer;
 background-color: blueviolet;
 color: #fff;
 border-radius: 8px;
 font-size: 17px;
 max-width: 100%;
 word-wrap: break-word;
`;
