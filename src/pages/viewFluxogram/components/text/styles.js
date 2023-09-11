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

const blink = keyframes`
  50% {opacity: 0}
`

const disappear = keyframes`
  0% {
    opacity: 1;
  }

  99% {
    opacity: 1;
  }

  100% {
    opacity: 0;
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

  p {
    margin: 0;
    animation: 1.5s ${appear} forwards;
    text-align: left;
    max-width: 100%;
    height: auto;
    word-wrap: break-word;
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
  max-width: 100%;
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