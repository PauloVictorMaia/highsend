import { styled } from "styled-components";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export const NodeContainer = styled.textarea`
  width: 100%;
  height: 80px;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  font-family: 'Oswald', sans-serif;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
  scrollbar-width: thin; 
  scrollbar-color: #888 #f0f0f0;

  &:focus {
    outline: 2px solid #9999FF;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
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

export const Container = styled.div`
  position: relative;
  border: ${({ isvisible }) => isvisible ? "2px solid #9999FF" : "none"};
  border-radius: 9px;

  &:focus {
    border: 2px solid #9999FF; 
    border-radius: 9px;
  }
`;

export const StyledTextarea = styled(ReactQuill)`

  .ql-container {
    border: 1px solid rgba(0, 0, 0, 0.15); 
    border-top: none; 
    border-radius: 0 0 8px 8px; 
    transition: border-color 0.3s ease; 
    height: 107px;
  }

  .ql-toolbar {
    border: 1px solid rgba(0, 0, 0, 0.15); 
    border-bottom: none; 
    border-radius: 8px 8px 0 0; 
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }

  .ql-toolbar.ql-snow {
    button,
    .ql-picker-label,
    .ql-picker-options {
      margin: 0; 
    }
  }
`;