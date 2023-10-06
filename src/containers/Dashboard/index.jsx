import {
  DashBoardContainer,
  DashContent,
  MenuContainer,
  MenuItem,
  Link,
  Container,
  Divider
} from "./style";
// import { TiFlowSwitch } from "react-icons/ti";
// import { TfiAgenda } from "react-icons/tfi";
// import { TbDeviceAnalytics } from "react-icons/Tb";
// import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { Outlet, useLocation } from "react-router";
import TopBar from "../../components/TopBar";
import { useState } from "react";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Loader from "../../components/LoadingScreen";

// eslint-disable-next-line react/prop-types
const DashBoard = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const { openMenu, login } = useStateContext();
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
                    <MenuItem onClick={() => setPath("/dashboard/fluxograms/")} active={path.includes("/dashboard/fluxograms")} openmenu={openMenu}>
                      <PeopleOutlineIcon size={20} />
                      <span>Fluxos de Bot</span>
                    </MenuItem>
                  </Link>

                  <Link to='schedules'>
                    <MenuItem onClick={() => setPath("/dashboard/schedules")} active={path.includes("/dashboard/schedules")} openmenu={openMenu}>
                      <PeopleOutlineIcon size={20} />
                      <span>Agendas</span>
                    </MenuItem>
                  </Link>

                  <Link to='leads'>
                    <MenuItem onClick={() => setPath("/dashboard/leads/*")} active={path.includes("/dashboard/leads")} openmenu={openMenu}>
                      <PeopleOutlineIcon />
                      <span>Meus leads</span>
                    </MenuItem>
                  </Link>

                  <Divider></Divider>

                  <Link to='integrations'>
                    <MenuItem openmenu={openMenu} onClick={() => setPath("/dashboard/integrations")} active={path.includes("/dashboard/integrations")}>
                      <PeopleOutlineIcon size={20} />
                      <span>Integrações</span>
                    </MenuItem>
                  </Link>

                  <Link to='analytics'>
                    <MenuItem onClick={() => setPath("/dashboard/analytics")} active={path.includes("/dashboard/analytics")} openmenu={openMenu}>
                      <PeopleOutlineIcon size={20} />
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
        <Loader />
      }
    </>
  )

}

export default DashBoard;