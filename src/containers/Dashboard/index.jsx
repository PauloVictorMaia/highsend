import { DashBoardContainer, DashContent, MenuContainer, MenuItem } from "./style";

const DashBoard = ({ children }) => {
  return(
    <DashBoardContainer>
      <DashContent>

        <MenuContainer>
          Fluxos
          <MenuItem>Fluxos de bot</MenuItem>
          <MenuItem>Fluxos de perguntas</MenuItem>
          Agenda
          <MenuItem>Agendas</MenuItem>
          <MenuItem>Eventos</MenuItem>
          Configurações
        </MenuContainer>
        
      </DashContent> 
      <div style={{ flex: 1 }}>
        { children }
      </div>
    </DashBoardContainer>
  )
}

export default DashBoard;