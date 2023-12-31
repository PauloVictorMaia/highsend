import styled, { keyframes } from 'styled-components';

const appear = keyframes`  
  0%, 99%{
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const blink = keyframes`
  50% {opacity: 0}
`

const fadeIn = keyframes`
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const BubleText = styled.div`
  .message {
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-delay: 0s;
    background: transparent;
    display: flex;
    margin: 5px 0;
    width: 100%;
  }

  .typing-indicator {
    display: flex;
    
    span {
      height: 10px;
      width: 10px;
      margin: 0 2px;
      background-color: #9E9EA1;
      display: block;
      border-radius: 50%;
      opacity: 0.4;
      animation: ${blink} 1s infinite;
    }
  }
`;

export const MessageContainer = styled.div`
 
`;

export const MessageContent = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75em 1.5em;
  box-sizing: border-box;
  background: #F7F8FF;
  border-radius: 10px;
  color: #333;
  width: ${({ typing }) => typing ? '70px' : '100%' };
  height: ${({ typing }) => typing ? '40px' : '100%'};
  transition: width .4s ease-out,height .4s ease-out;
  min-height: 40px;
  position: relative;

  .image {
    animation: .5s ${appear} forwards;
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
`;