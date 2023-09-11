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

export const Container = styled.div`
 width: 100%;
 display: flex;
 justify-content: flex-end;
`;

export const Button = styled.button`
 margin-top: 10px;
 cursor: pointer;
 width: auto;
 padding: 10px;
 border-radius: 4px;
 outline: none;
 border: none;
 animation: 1.5s ${appear} forwards;
 text-align: left;
 font-size: 16px;
 max-width: 100%;
 word-wrap: break-word;
`;

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

export const Text = styled.div`
 margin-top: 10px;
 cursor: pointer;
 background-color: blueviolet;
 color: #fff;
 width: auto;
 padding: 10px;
 border-radius: 4px;
 font-size: 16px;
 max-width: 100%;
 word-wrap: break-word;
`;
