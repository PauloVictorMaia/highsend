import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 40px;
  color: #000;
  display: Flex;
  align-items: center;
  border: 1px solid #000;
  background-color: #fff;
  border-radius: 8px;
  padding: 0;
  box-sizing: border-box;
`;

export const InputPreview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

export const InputConfig = styled.div`
  visibility: ${({isvisible}) => isvisible === "true" ? "visible" : "hidden"};
  width: 300px;
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  left: -325px;
  top: -30px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;

  >span {
    font-size: 1rem;
  }
  >input {
    margin-bottom: 10px;
  }
`;