import { styled } from "styled-components";

export const Container = styled.div`
 width: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 color: #092C4C;
 /* padding: 0 15px 20px 15px; */
`;

export const CheckboxContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const DaysContainer = styled.div`
  width: 100%;
  min-height: 85px;
  justify-content: space-between;
 display: flex;
 margin: 10px 0;
 align-items: center;
 border: 1px solid #E0EAFF;
 border-radius: 8px;
 padding: 10px 20px;
 box-sizing: border-box;
`;

export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

export const InputTimeContainer = styled.div`
  display: flex;
  column-gap: 10px;
  height: 100%;
  width: 130px;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: space-around;
  border: 1px solid #E0EAFF;
  border-radius: 8px;

  >svg {
    color: #4339F2;
  }
`;

export const IntervalsContainer = styled.div`
 display: flex;
 column-gap: 15px;
`;


export const ToggleContainer = styled.div`
  padding: 20px;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
`;

export const OptionLabel = styled.div`
  display: flex;
  align-items: center;
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
 height: 60px;
 border-radius: 4px;
 outline: none;
 border: 1px solid #E0EAFF;
 padding: 8px 16px; 
 box-sizing: border-box;
 line-height: 20px;
 font-family: 'Poppins', sans-serif;
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
  padding: 15px 0 15px 10px;
`;

export const WhatsappMessageInfo = styled.div`
  width: 500px;
  border: 2px solid #4339F2;
  border-radius: 14px;
  background-color: #E0EAFF;
  padding: 10px;
  box-sizing: border-box;
  margin: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  span {
    color: #1B192E;
  }
`;

export const VariableExample = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #4339F2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

export const IconText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-size: 0.8rem;

  svg {
    color: #4339F2;
  }
`;

export const WhatsappMessage = styled.textarea`
  display: block;
  width: 500px;
  height: 200px;
  background-color: #fff;
  border: 0.5px solid rgba(0,0,0,0.15);
  outline: none;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  display: block;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
  scrollbar-width: thin; 
  scrollbar-color: #888 #f0f0f0;
  margin-top: 5px;
  margin-left: 10px;

  &:focus {
    outline: 2px solid #4339F2;
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

export const CountContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const EventConfig = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  row-gap: 10px;

  >h5 {
    margin: 0;
    color: #4339F2;
  }

  >span {
    font-size: 0.9rem;
  }
`

export const CountInput = styled.input`
  width: 50px;
  text-align: center;
  font-size: 1rem;
  border: none;
  outline: none;
`;

export const TimeCount = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border: 1px solid #E0EAFF;
  border-radius: 200px;

  >svg {
    cursor: pointer;
  }
`;

export const SaveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
  justify-content: end;
`;

export const SaveButton = styled.button`
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border: none;
  border-radius: 15px;
  color: #fff;
  background-color: #4339F2;
  outline: none;
  cursor: pointer;
`;