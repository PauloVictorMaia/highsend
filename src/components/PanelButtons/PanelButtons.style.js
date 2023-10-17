import { styled } from "styled-components";

export const Container = styled.div`
  width: 60px;
  height: 150px;
  margin-top: 60px;
  border-radius: 8px;
  border: 0.5px solid rgba(0,0,0,0.15);
  box-shadow: 0 5px 7px 0 (rgba(0,0,0,0.15));
  background-color: #fff;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  padding: 5px 3px;
  box-sizing: border-box;
  padding: 5px;
  position: relative;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;

  &:disabled {
    opacity: 0.5;
  }

  >svg {
    color: ${({color}) => color ? "#ff8c1a" : "#333"};
    width: 70%;
    height: auto;
    font-size: small;
  }
`;

export const Label = styled.span`
  font-size: 10px;
  color: #333;
  color: ${({color}) => color ? "#ff8c1a" : "#333"};
`;

export const DropDownMenu = styled.div`
  position: absolute;
  top: 0;
  left: ${({ isvisible }) => isvisible ? "-250px" : "200px"};
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  background-color: #fff;
  transition: 0.5s ease-out;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  text-align: center;
  min-width: 220px;
`;

export const ProfileImageContainer = styled.div`
  max-width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  border: 0.5px dashed #9999FF;
  border-radius: 5px;
  cursor: pointer;
`;

export const ProfileImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  background-position: 50% 50%;
`;

export const TemplateContainer = styled.div`
  max-width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
  font-size: 0.8rem;
  border: 0.5px dashed #9999FF;
  border-radius: 5px;

  >select {
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
`;

export const Modal = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 5000;
`;

export const ModalContent = styled.div`
  width: ${({ width }) => width? `${width}px` : '300px'};
  height:${({ height }) => height? `${height}px` : '150px'}; ;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: #ff4d4d;
  padding: 2px;
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;

export const ProfileNameInput = styled.input`
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
`;