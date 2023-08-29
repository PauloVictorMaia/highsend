import styled, { keyframes, css } from 'styled-components';

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
    animation: 2s ${appear} forwards;
  }

  .typing-indicator {
    $ti-color-bg: #e9eeef;
    will-change: transform;
    display: flex;
    animation: 0s ${disappear} 2s forwards;
    
    span {
      height: 10px;
      width: 10px;
      float: left;
      margin: 0 1px;
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
  margin: 1rem 0;
  width: 100%;

  &:after {
    content: "";
    position: absolute;
    left: -12px;
    border-left: 25px solid transparent;
    border-right: 10px solid transparent;
    border-top: 25px solid #ECF0F1;
  }
}

.avatar {
  width: 75px;
  height: 75px;
  background: url('http://lorempixel.com/75/75');
  margin-right: 20px;
  border-radius: 50%;
}

.message-content {
  display: flex;
  align-items: center;
  padding: 0.75em 1.5em;
  background: #ECF0F1;
  border-radius: 10px;
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
  
  .card {
    width: calc(50vw);
  }
}

	/* position: relative;
	max-width: 30em;
	background-color: #fff;
	padding: 1.125em 1.5em;
	font-size: 1.25em;
	border-radius: 1rem;
  box-shadow:	0 0.125rem 0.5rem rgba(0, 0, 0, .3), 0 0.0625rem 0.125rem rgba(0, 0, 0, .2);

  &:before {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	bottom: 100%;
	left: -.5em;
  top: .5em;
	border: .75rem solid transparent;
	border-top: none;

	border-bottom-color: #fff;
	filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, .1)); */
`;