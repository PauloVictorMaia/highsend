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
 height: 220px;
 background-color: #fff;
 border-radius: 8px;
 cursor: pointer;
 transition: .5s;
 padding: 10px;
 box-sizing: border-box;
 position: relative;

 &:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
`;

export const TitleContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
`;

export const CardTitle = styled.span`
  font-size: 20px;
  color: #333;
  display: block;
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
 margin-top: ${({ margin }) => margin? '10px' : '60px'};
`;

export const ButtonText = styled.div`
 display: flex;
 align-items: center;
 height: 30px;

 &:hover{
  box-sizing: border-box;
  border-radius: 4px;
  background: ${({ hover }) => hover? '#bfbfbf' : ''};
  padding: ${({ hover }) => hover? '2px' : ''};
 }

 span {
  margin-left: 5px;
  color: #6666ff;

  &:hover{
    text-decoration: underline;
  }
 }
`;

export const DropMenuCard = styled.div`
 position: absolute;
 width: 150px;
 height: 200px;
 background-color: #fff;
 border-radius: 8px;
 right: 10px;
 top: 40px;
 padding: 10px;
 z-index: 1000;
 border: 1px solid rgba(26, 26, 26, 0.61);
`;