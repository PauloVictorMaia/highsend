import styled from "styled-components";

export const Container = styled.div`
  padding: 0 15px 10px 15px;
  height: 100%;
  max-height: calc(100vh - 280px);
  overflow-y: scroll;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  box-shadow: 0 5px 7px 0 rgba(0,0,0,0.45);
  flex: 0 0 250px;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    height: 42px;
    overflow: hidden;

    h2 {
      font-size: 1.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;