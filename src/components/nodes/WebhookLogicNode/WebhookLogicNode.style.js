import { styled } from "styled-components";

export const NodeContainer = styled.div`
  width: 100%;
  height: 40px;
  display: Flex;
  align-items: center;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  color: #333;
  position: relative;
`;

export const NodePreview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;

  > svg {
    color: #9999FF;
  }
`;

export const InputContainer = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 330px;
  min-height: 100px;
  position: absolute;
  left: -355px;
  top: -65px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.15);

  >span {
    text-align: left;
  }
`;

export const Inputs = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 5px 10px;
  box-sizing: border-box;
`;

export const LinkInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 3px;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  color: #333;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  padding-left: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;

  &:focus {
    outline: 2px solid #9999FF;
  }
`;

export const SwitchContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  >span {
    color: #333;
    font-size: 0.9rem;
  }
`;

export const MethodInput = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  >select {
    height: 30px;
    border: 0.5px solid rgba(0,0,0,0.15);
    border-radius: 3px;
    outline: none;
    font-family: 'Oswald', sans-serif;
    font-size: 16px;
    color: #333;

    &:focus {
      outline: 2px solid #9999FF;
    }
  }
`;

export const ConfigContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 0.5px solid rgba(0,0,0,0.30);
  margin-bottom: 5px;
`;

export const ConfigLabel = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f4f4f4;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`; 

export const ConfigButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    width: 130px;
    height: 30px;
    border-radius: 5px;
    background-color: #E67200;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
  }
`;


export const EditConfigContainer = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  margin: 10px 0;

  >svg {
    color: rgba(0,0,0,0.6);
    font-size: large;
    cursor: pointer;
  }
`;

export const EditConfigInputs = styled.div`
  display: flex;
  flex-direction: column;
  
  >input {
    width: 100%;
    height: 40px;
    border-radius: 3px;
    border: 0.5px solid rgba(0,0,0,0.15);
    outline: none;
    color: #333;
    font-family: 'Oswald', sans-serif;
    font-size: 14px;
    padding-left: 8px;
    box-sizing: border-box;
    margin-bottom: 10px;
    
    &:focus {
      outline: 2px solid #9999FF;
    }
  }
  `;

  export const HeadersContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 0.5px solid rgba(0,0,0,0.30);
    margin-bottom: 5px;
  `;
  
  export const HeadersLabel = styled.div`
    width: 100%;
    height: 30px;
    background-color: #f4f4f4;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `; 

export const HeadersButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    width: 130px;
    height: 30px;
    border-radius: 5px;
    background-color: #E67200;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
`;

export const EditHeadersContainer = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 0.5px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  margin: 10px 0;
`;

export const EditHeadersInputs = styled.div`
  display: flex;
  flex-direction: column;

  >input {
    width: 100%;
    height: 40px;
    border-radius: 3px;
    border: 0.5px solid rgba(0,0,0,0.15);
    outline: none;
    color: #333;
    font-family: 'Oswald', sans-serif;
    font-size: 14px;
    padding-left: 8px;
    box-sizing: border-box;
    margin-bottom: 10px;

    &:focus {
      outline: 2px solid #9999FF;
    }
  }
`;

export const CloseButton = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: #ff4d4d;
  padding: 2px;
  position: absolute;
  top: -5px;
  right: -5px;
  cursor: pointer;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;

export const CustomToolbar = styled.div`
  display: ${({ isvisible }) => isvisible ? "flex" : "none"};
  width: 30px;
  height: 30px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 3px;
  position: absolute;
  top: -35px;
  right: 30px;
`;