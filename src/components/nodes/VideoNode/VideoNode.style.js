import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: Flex;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
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
  max-width: 175px;
  height: auto;
`;

export const LinkInputContainer = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  position: absolute;
  width: 350px;
  height: 70px;
  left: -375px;
  top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 15px 5px 5px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);
`;

export const LinkInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
`;