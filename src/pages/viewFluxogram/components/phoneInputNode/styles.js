import styled from 'styled-components';

export const Container = styled.div`
 width: 100%;
 display: flex;
 justify-content: flex-end;
`;

export const Text = styled.div`
 margin: 10px 0;
 cursor: pointer;
 background-color: blueviolet;
 color: #fff;
 width: auto;
 padding: 10px;
 border-radius: 4px;
 max-width: 100%;
 word-wrap: break-word;
`;

export const InputContainer = styled.div`
 max-width: 350px;
 background-color: #F7F8FF;
 height: 50px;
 padding: 8px;
 margin: 10px 0;
 border-radius: 8px;

 input {
  height: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
 }

 button {
  height: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: blueviolet;
  color: #fff;
  font-weight: bold;
 }
`;