import { styled } from "styled-components";

export const SidebarContainer = styled.aside`
  width: 300px;
  position: fixed;
  top: 10px;
  left: 230px; 
  color: #000;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 8px;
`;

export const NodeDraggable = styled.div`
  width: 130px;
  height: 30px;
  background-color: #f2f2f2;
  border-radius: 5px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding-left: 15px;
  box-sizing: border-box;
`;

export const NodesType = styled.span`
  font-size: 0.9rem;
`;

export const BubblesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;