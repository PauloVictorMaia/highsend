import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: #000;
`;

export const EditInputsContent = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  >input { 
    width: 350px;
    height: 30px;
    border: 0.5px solid rgba(0,0,0,0.15);
    border-radius: 4px;
    
    &:focus {
      outline: 1.5px solid #F26800;
    }
  }

  >button {
    width: 70px;
    height: 25px;
    border-radius: 5px;
    background-color: #F26800;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;