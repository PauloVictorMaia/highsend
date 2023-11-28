import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  display: flex;
  justify-content: center;
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
`;