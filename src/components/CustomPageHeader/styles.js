import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  box-sizing: border-box;
`;

export const TitleHeader = styled.span`
 color: #333;
 font-size: 35px;
 margin-bottom: 30px;
 display: block;
`;

export const MenuItems = styled.header`
  display: flex;
  margin-bottom: 5px;
  padding: 13px 0;
`;

export const ItemElement = styled.div`
 
`;

export const Item = styled.span`
  color: rgba(26, 26, 26, 0.61);
  padding: 15px 20px;
  border-bottom: ${({ active }) => active? '4px solid #4339F2' : ''};

  &:hover {
    cursor: pointer;
    border-bottom: ${({ active }) => active? '' : '4px solid #bfbfbf'};
    border-radius: 3px;
  }
`;

export const ContentHeader = styled.div`
 display: flex;
 justify-content: space-between;
`;

export const Button = styled.button`
 width: 150px;
 margin-bottom: 5px;
 border-radius: 15px;
 cursor: pointer;
 padding: 10px 15px;
 border: none;
 background-color: #4339F2;
 color: #fff;
`;