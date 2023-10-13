import { styled } from "styled-components";

export const DropzoneContainer = styled.div`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  color: #333;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;