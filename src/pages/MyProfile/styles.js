import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  /* background-color: aquamarine; */
`;

export const ProfileDataContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProfileImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  column-gap: 50px;
`;

export const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${({ profileimage }) => `url(${profileimage})`};
  background-size: cover;
  background-position: 50% 50%;
  color: #fff;
  font-size: 3rem;
  background-color: #F26800;
  position: relative;
`;

export const ProfileName = styled.span`
  font-size: 2.5rem;
  color: #333;
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

export const ProfileNameInputContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  column-gap: 30px;
`;

export const ProfileNameInput = styled.input`
  width: 40%;
  height: 40px;
  border-radius: 3px;
  color: #333;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  padding-left: 10px;
  box-sizing: border-box;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;

  &:focus {
    outline: 2px solid #9999FF;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ProfileNameButtonsContainer = styled.div`
  display: flex;
  width: 80px;
  height: 40px;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileNameSaveButton = styled.button`
  outline: none;
  border: none;

  > svg {
    color: ${({ color }) => color ? "#F26800" : "#333"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;