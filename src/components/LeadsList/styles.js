import styled from "styled-components";

export const NewContainer = styled.div`
  position: relative;
  height: 100%;
`;

export const Container = styled.div`
  padding: 0 15px 10px 15px;
  height: 100%;
  max-height: calc(100vh - 280px);
  overflow-y: scroll;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.45);
  /* flex: 0 0 250px; */
  width: 250px;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
    overflow: hidden;
    color: #333;

    h2 {
      font-size: 1.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    svg {
      cursor: pointer;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
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
  height: 25px;
  border-radius: 20px;
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