import { styled } from "styled-components";

export const Container = styled.div`
  color: #000;
  padding: 20px 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 30px;
  row-gap: 30px;
`;

export const ScheduleCard = styled.div`
 width: 100%;
 max-width: 350px;
 height: 270px;
 background-color: #fff;
 border-radius: 8px;
 transition: .5s;
 padding: 20px;
 box-sizing: border-box;
 position: relative;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 opacity: ${({active}) => active ? "1" : "0.5"};
 cursor: pointer;
 box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.1);

 &:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
`;

export const TitleContainer = styled.div`
  min-height: 65px;
  display: flex;
  justify-content: space-between;
`;

export const CardTitle = styled.span`
  font-size: 20px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardColor = styled.div`
 width: 20px;
 height: 20px;
 background: ${({ color }) => color? color : ''};
 border-radius: 50%;
 `;

export const CardDetails = styled.span`
 display: block;
 color: rgba(26, 26, 26, 0.61);
 margin-top:${({ marginTop }) => marginTop? `${marginTop}px` : 0};
`;

export const ButtonCard = styled.div`
 border-top: 1px solid #bfbfbf;
 padding: 15px 0;
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-top: ${({ margin }) => margin? `${margin}` : '0px'};
`;

export const ButtonText = styled.div`
 display: flex;
 align-items: center;
 height: 30px;
 padding: 5px;
 box-sizing: border-box;

 &:hover{
  box-sizing: border-box;
  border-radius: 4px;
  background: ${({ hover }) => hover? '#f2f2f2' : ''};
  /* padding: ${({ hover }) => hover? '2px' : ''}; */
 }

 span {
  margin-left: 5px;
  color: #6666ff;

  &:hover{
    text-decoration: underline;
    cursor: pointer;
  }
 }
`;

export const DropMenuCard = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: #fff;
  border-radius: 8px;
  right: 10px;
  top: 40px;
  padding: 10px;
  z-index: 1000;
  border: 1px solid rgba(26, 26, 26, 0.61);
  row-gap: 5px;
`;

export const MenuCardButtons = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 0.8rem;
  color: #333;
  cursor: pointer;

  >svg {
    color: #333;
    font-size: 1.2rem;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const SwitchContainer = styled.div`
  width: 100%;
  height: 30px;
  border-top: 1px solid rgba(0,0,0,0.15);
  position: relative;
  bottom: -5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  box-sizing: border-box;

  >span {
    color: #333;
    font-size: 0.9rem;
  }
`;

export const Modal = styled.div`
  visibility: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

export const ModalContent = styled.div`
  width: 330px;
  height: 200px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: #ff4d4d;
  padding: 2px;
  position: relative;
  top: -10px;
  right: -310px;
  cursor: pointer;

  >svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;

export const DeleteCalendar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
  row-gap: 20px;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 5px;
`;

export const Button = styled.button`
    width: 100px;
    padding: 20px 60px;
    height: 25px;
    border-radius: 5px;
    background-color: ${({color}) => color};
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
`;