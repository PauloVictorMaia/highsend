import styled, { keyframes } from 'styled-components';

const pulsate = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

export const Container = styled.div`
 width: 100%;
 display: flex;
 justify-content: flex-end;
`;

export const Button = styled.button`
  margin-top: 10px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  outline: none;
  border: none;
  animation:${pulsate} 1.5s infinite;
  text-align: center; /* centralizando o texto */
  font-size: 16px;
  font-weight: 600; /* adicionando peso à fonte */
  text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5); /* adicionando sombra ao texto */
  max-width: 100%;
  word-wrap: break-word;
  background: linear-gradient(45deg, #FF6B6B, #FF9B30); /* adicionando cor de gradiente */
  color: white; /* mudando a cor da fonte para branco */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2); /* adicionando sombra ao botão */
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.3);
  }
`;
