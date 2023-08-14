import { styled } from "styled-components";

export const SidebarContainer = styled.aside`
  width: 305px;
  position: fixed;
  top: 70px;
  left: ${({openmenu}) => openmenu === "true" ? "230px" : "20px"}; 
  color: #000;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 0.5px solid rgba(0,0,0,0.15);
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);
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
  font-size: 0.9rem;
  color: rgba(0,0,0,0.8);
  cursor: grab;
`;

export const NodesType = styled.span`
  font-size: 0.9rem;
`;

export const NodesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 15px;
  margin: 10px 0;
`;