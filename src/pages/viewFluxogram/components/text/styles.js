import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const BubleText = styled.div`
  background-color: #FFF;
  border: #333;
  border-radius: 6px;
  transition: width .4s ease-out,height .4s ease-out;
  animation: ${fadeIn} .3s ease-out;
`;