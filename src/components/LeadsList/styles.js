import styled from "styled-components";

export const NewContainer = styled.div`
  position: relative;
  height: 100%;
`;

export const Container = styled.div`
  padding: 10px 15px;
  height: 100%;
  max-height: calc(100vh - 140px);
  overflow-y: scroll;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.45);
  width: 300px;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
    overflow: hidden;
    color: #333;
    margin-bottom: 20px;
    padding-left: 6px;
    box-sizing: border-box;

    h2 {
      font-size: 1.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    svg {
      cursor: pointer;
    }
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const ListMenu = styled.div`
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  flex-direction: column;
  row-gap: 10px;
  position: absolute;
  top: 0px;
  right: -240px;
  width: 230px;
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 8px;
  z-index: 10000;
`;

export const MenuButtons = styled.button`
  width: 100%;
  outline: none;
  height: 35px;
  border-radius: 8px;
  border: 0.5px solid rgba(0,0,0,0.15);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  background-color: #f2f2f2;
  display: flex;
  column-gap: 15px;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }

  >svg {
    color: #555;
  }
`;

export const ListButtons = styled.button`
  width: 100%;
  outline: none;
  height: 35px;
  border-radius: 8px;
  border: none;
  background-color: #4339F2;
  color: #fff;
  display: flex;
  column-gap: 15px;
  align-items: center;
  padding: 0 15px 0 20px;
  cursor: pointer;
  overflow: hidden;

  >svg {
    color: #fff;
    font-size: large;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  min-height:${({ height }) => height? `${height}px` : '150px'}; ;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
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

export const MessageDeleteModal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  h2 {
    color: #333;
    text-align: center;
  }

  span {
    color: #333;
    font-size: 0.8rem;
  }
`;

export const ModalDeleteListButtons = styled.button`
  outline: none;
  width: 250px;
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

export const ListOptionsInModal = styled.div`
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  flex-direction: column;
  row-gap: 10px;
`;