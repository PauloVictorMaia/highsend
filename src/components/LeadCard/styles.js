import styled from "styled-components";
import LeadImage from '../../assets/leadimage.png';

export const Container = styled.div`
  background-color: #fff;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  border: 1px solid #E0EAFF;
  box-shadow: 0px 3.50699px 7.01397px 0px #D3DAE2;

  div {
    height: 100px;
    width: 100%;
    color: #3B3F5C;
    padding: 10px 30px;
    box-sizing: border-box;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .text {
    font-size: 15px;
  }
`;

export const CardTitle = styled.span`
  font-size: 22px;
  height: 60px;
  max-height: 60px;
  width: 100%;
  max-width: 100%;
  text-align: start;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Banner = styled.img`
 /* background-image: url(${LeadImage}); */
 /* background-size: contain;
 background-repeat: no-repeat; */
 width: 100%;
 height: auto;
 border-radius: 8px 8px 0 0;
`;