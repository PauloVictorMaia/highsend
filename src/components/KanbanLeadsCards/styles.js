import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 55px;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(192,208,230, 0.8);
  cursor: grab;
  overflow: hidden;
  
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${({ isdragging }) => isdragging && css`
    border-radius: 8px;
    border: none;
    background: #e6e6e6;
    box-shadow: none;
    cursor: grabbing;

    span {
      opacity: 0;
    }
  `}

  ${({ isOver }) => isOver && css`
    border-radius: 8px;
    border: 2px dashed #555;
    background: #e6e6e6;
    box-shadow: none;
    cursor: grabbing;

    span {
      opacity: 0;
    }
  `}
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
  min-height:${({ height }) => height? `${height}px` : '150px'}; 
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
    color: #fff;
  }
`;

export const LeadsContentContainer = styled.div`
  width: 100%;
  min-height: 40px;
  max-height: 80vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  text-align: center;

  h3 {
    margin: 0;
  }
`;

export const LeadContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const VariableContent = styled.div`
  width: 50%;
  padding: 0 10px;
  box-sizing: border-box;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  & + div {
    border-left: 0.5px solid rgba(0,0,0,0.15);
  }

  span {
    max-width: 100%;
    color: #333;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArchiveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DeleteLeadButton = styled.button`
  outline: none;
  min-height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${({ background }) => background};
  color: #fff;
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  justify-content: center;
  column-gap: 15px;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
`;

export const ConfirmDeleteButton = styled.button`
  width: 150px;
  outline: none;
  height: 40px;
  border-radius: 8px;
  border: none;
  background-color: ${({ background }) => background};
  color: #fff;
  display: flex;
  justify-content: center;
  column-gap: 15px;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
`;

export const SendMessageLead = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

export const ConfirmDeleteLead = styled.div`
  width: 100%;
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  
  span {
    margin-bottom: 20px;
  }
`;

export const ConfirmDeleteButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 30px;
  align-items: center;
`;

export const WhatsappMessageContainer = styled.div`
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
`;

export const ButtonsBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  column-gap: 20px;
`;

export const WhatsappButton = styled.button`
  width: 250px;
  outline: none;
  height: 40px;
  border-radius: 8px;
  border: none;
  background-color: ${({ background }) => background};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  column-gap: 10px;
  font-size: 16px;

  svg {
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const WhatsappMessageInfo = styled.div`
  width: 90%;
  border: 2px solid #4339F2;
  border-radius: 14px;
  background-color: #E0EAFF;
  padding: 10px;
  box-sizing: border-box;
  margin: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  span {
    color: #1B192E;
  }
`;

export const VariableExample = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #4339F2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

export const IconText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-size: 0.8rem;

  svg {
    color: #4339F2;
  }
`;

export const WhatsappMessage = styled.textarea`
  display: block;
  width: 90%;
  min-height: 200px;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
  scrollbar-width: thin; 
  scrollbar-color: #888 #f0f0f0;

  &:focus {
    outline: 2px solid #4339F2;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
`;