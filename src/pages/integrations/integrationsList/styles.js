import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  color: rgba(0,0,0,0.75);
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
  overflow-y: auto;
`;

export const Integrations = styled.div`
  width: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 20px;
  padding-left: 60px;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const UserIntegrations = styled.div`
  width: 100%;
  min-height: 120px;
  padding-left: 60px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 20px;
`;