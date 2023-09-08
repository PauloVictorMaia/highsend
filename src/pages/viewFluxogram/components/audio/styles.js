import styled, { keyframes } from 'styled-components';

const appear = keyframes`  
  0% {
    display: none;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  99% {
    display: none;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  100% {
    display: flex;
    width: auto;
    height: auto;
  }
`

const blink = keyframes`
  50% {opacity: 0}
`

const disappear = keyframes`
  0% {
    display: block;
  }

  99% {
    display: block;
  }

  100% {
    display: none;
    width: 0;
    height: 0;
    overflow: hidden;
  }
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
.chat-thread {
  .message {
    animation: ${fadeIn} 1s ease-in-out;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-delay: 0s;
  }

  .typing-indicator {
    display: flex;
    animation: 0s ${disappear} 1.5s forwards;
    
    span {
      height: 10px;
      width: 10px;
      float: left;
      margin: 0 2px;
      background-color: #9E9EA1;
      display: block;
      border-radius: 50%;
      opacity: 0.4;
      animation: ${blink} 1s infinite;
    }
  }
}

.message {
  background: transparent;
  display: flex;
  margin: 5px 0;
  width: 100%;
}

.message-content {
  display: flex;
  align-items: center;
  padding: 0.75em 1.5em;
  background: #F7F8FF;
  border-radius: 10px;
  color: #333;
}

.chat-actions {
  text-align: center;
  align-items: center;

  button {
    margin-top: 1rem;
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  .card {
    width: 100%;;
  }
}
`;

export const AudioControl = styled.div`
  display: flex;
  align-items: center;
  background-color: #E5E5E5;
  border-radius: 20px;
  padding: 5px 10px;
  min-width: 250px;
  animation: 1.5 ${appear} forwards;
`;

export const AudioButton = styled.button`
  font-size: 20px;
  width: 30px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: none;
`;

export const AudioBarComponent = styled.div`
  flex-grow: 1;
  height: 5px;
  background-color: #D4D4D4;
  margin: 0 10px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

export const AudioProgress = styled.div`
  height: 100%;
  background-color: #34B7F1;
  width: ${props => props.percentage}%; 
`;