import { styled } from "styled-components";

export const Container = styled.div`
 width: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 color: #333;
 padding: 0 15px;
`;

export const CheckboxContainer = styled.div`
  width: 120px;
  height: 35px;
  padding-left: 5px;
  margin: 0px 25px 0 0;
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
  margin-left: 10px;
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
  border: 1px solid rgba(0,0,0,0.15);
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
 max-width: 100%;
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

export const Input = styled.input`
 height: 40px;
 border-radius: 4px;
 outline: none;
 border: 1px solid rgba(0,0,0,0.15);
 padding: 5px 10px;
 box-sizing: border-box;
`;

export const Select = styled.select`
  height: 40px;
  border-radius: 4px;
  outline: none;
  border: 1px solid rgba(0,0,0,0.15);
  padding: 5px 10px;
  box-sizing: border-box;
`;

export const EventItem = styled.div`
 height: 60px;
 background: #14140F;
 color: #fff;
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

export const IntegrationsOptions = styled.div`
  padding: 15px 0;
`;

export const WhatsappMessage = styled.textarea`
  display: block;
  width: 200px;
  height: 200px;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  font-family: 'Oswald', sans-serif;
  display: block;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
  scrollbar-width: thin; 
  scrollbar-color: #888 #f0f0f0;
  margin-top: 5px;

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