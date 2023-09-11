import {
  DashBoardContainer,
  DashContent,
  MenuContainer,
  MenuItem,
  Link,
  Container,
  Divider
} from "./style";
import { TiFlowSwitch } from "react-icons/Ti";
import { TfiAgenda } from "react-icons/Tfi";
import { BsFillPeopleFill } from "react-icons/Bs";
import { TbDeviceAnalytics } from "react-icons/Tb";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { Outlet, useLocation } from "react-router";
import TopBar from "../../components/TopBar";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const DashBoard = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const { openMenu, login } = useStateContext();
  return (
    <>
      {login?
        <Container>
          <TopBar />
          <DashBoardContainer>
            <DashContent openmenu={openMenu}>
              <div>
                <MenuContainer>
                  <Link to='fluxograms'>
                    <MenuItem onClick={() => setPath("/dashboard/fluxograms")} active={path === "/dashboard/fluxograms"} openmenu={openMenu}>
                      <TiFlowSwitch size={20} />
                      <span>Fluxos de Bot</span>
                    </MenuItem>
                  </Link>

                  <Link to='schedules'>
                    <MenuItem onClick={() => setPath("/dashboard/schedules")} active={path === "/dashboard/schedules"} openmenu={openMenu}>
                      <TfiAgenda size={20} />
                      <span>Agendas</span>
                    </MenuItem>
                  </Link>

                  <Link to='leads'>
                    <MenuItem onClick={() => setPath("/dashboard/leads")} active={path === "/dashboard/leads"} openmenu={openMenu}>
                      <BsFillPeopleFill size={20} />
                      <span>Meus leads</span>
                    </MenuItem>
                  </Link>

                  <Divider></Divider>

                  <Link to='analytics'>
                    <MenuItem openmenu={openMenu}>
                      <MdOutlineIntegrationInstructions size={20} />
                      <span>Integrações</span>
                    </MenuItem>
                  </Link>

                  <Link to='analytics'>
                    <MenuItem onClick={() => setPath("/dashboard/analytics")} active={path === "/dashboard/analytics"} openmenu={openMenu}>
                      <TbDeviceAnalytics size={20} />
                      <span>Analytics</span>
                    </MenuItem>
                  </Link>

                </MenuContainer>
              </div>
            </DashContent>
            <div style={{ flex: 1, background: '#fafbfc' }}>
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