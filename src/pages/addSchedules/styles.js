import { styled } from "styled-components";

export const Container = styled.div`
 width: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 color: #333;
`;

export const CheckboxContainer = styled.div`
  width: 120px;
  height: 35px;
  padding-left: 5px;
  margin: 0px 4px;
  border-radius: 5px;
  
  background-color: ${props => props.checked ? '#97C160' : '#E5E5E5'};
  
  display: flex;
  align-items: center;

  cursor: pointer;
`;

export const StyledCheckbox = styled.label`
  width: 23px;
  height: 23px;
  margin-right: 6px;
  border-radius: 50%;
  background: #F6F6F6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Text = styled.label`
  color: ${props => props.checked ? '#FFF' : '#555'};
  cursor: pointer;
`;

export const DaysContainer = styled.div`
 display: flex;
 margin: 10px 0;
 align-items: center;
`;

export const IntervalsContainer = styled.div`
 display: flex;
 column-gap: 15px;
`;


export const ToggleContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const OptionLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const Content = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;

export const ContentContainer = styled.div`
 display: flex;
 flex-direction: column;
 width: 100%;
 max-width: 900px;
`;

export const TitleInput = styled.input`
 
`;

export const EnventsContainer = styled.div`
 min-height: 600px;
 height: 600px;
 width: 100%;
 display: grid;
 grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`} ;
 grid-gap: 20px;
`;

export const EventsContent = styled.div`
 width: 100%;
`;

export const EventItem = styled.div`
 height: 60px;
 background: #bfbfbf;
 margin: 5px 0;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 padding: 3px;
 border-radius: 8px;
 width: 100%;
`;

export const  MenuContainer = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  border: 0.5px solid rgba(0,0,0,0.15);
`;
