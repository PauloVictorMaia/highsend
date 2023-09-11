import {
  DashBoardContainer,
  DashContent,
  MenuContainer,
  MenuItem,
  Link,
  Container
} from "./style";
import { TiFlowSwitch } from "react-icons/Ti";
import { TfiAgenda } from "react-icons/Tfi";
import { BsFillPeopleFill } from "react-icons/Bs";
import { BiChat } from "react-icons/Bi";
import { TbDeviceAnalytics } from "react-icons/Tb";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { Outlet } from "react-router";
import TopBar from "../../components/TopBar";

// eslint-disable-next-line react/prop-types
const DashBoard = () => {
  const { openMenu, setOpenMenu, login } = useStateContext();
  return (
    <>
      {login ?
        <Container>
          <TopBar />
          <DashBoardContainer>
            <DashContent openmenu={openMenu}>
              <div>
                <MenuContainer>
                  <Link to='fluxograms'>
                    <MenuItem openmenu={openMenu}>
                      <TiFlowSwitch size={20} />
                      <span>Fluxos de Bot</span>
                    </MenuItem>
                  </Link>

                  <Link to='schedules'>
                    <MenuItem openmenu={openMenu}>
                      <TfiAgenda size={20} />
                      <span>Agendas</span>
                    </MenuItem>
                  </Link>

                  <Link to='leads'>
                    <MenuItem openmenu={openMenu}>
                      <BsFillPeopleFill size={20} />
                      <span>Meus leads</span>
                    </MenuItem>
                  </Link>

                  <Link to='analytics'>
                    <MenuItem openmenu={openMenu}>
                      <TbDeviceAnalytics size={20} />
                      <span>Analytics</span>
                    </MenuItem>
                  </Link>

                  <Link to='integrations'>
                    <MenuItem openmenu={openMenu}>
                      <MdOutlineIntegrationInstructions size={20} />
                      <span>Integrações</span>
                    </MenuItem>
                  </Link>

                </MenuContainer>
              </div>
            </DashContent>
            <div style={{ flex: 1, background: '#EAEAEA' }}>
              <Outlet />
            </div>
          </DashBoardContainer>
        </Container>
        :
        <div>Carregando...</div>
      }
    </>
  )
}

export default DashBoard;