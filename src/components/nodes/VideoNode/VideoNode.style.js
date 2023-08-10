import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: Flex;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 8px;
  color: #000;
`;

export const VideoPreview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 170px;
  height: auto;
`;

export const LinkInput = styled.input`
  visibility: ${({isvisible}) => isvisible === "true" ? "visible" : "hidden"};
  position: absolute;
  width: 350px;
  left: -385px;
  top: 10px;
`;