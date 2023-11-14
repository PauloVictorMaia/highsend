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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import Loader from "../../components/LoadingScreen";
import FluxogramIcon from "../../assets/SVGComponents/fluxogramIcon";
import CalendarIcon from "../../assets/SVGComponents/calendarIcon";
import LeadsIcon from "../../assets/SVGComponents/leads";
import IntegrationsIcon from "../../assets/SVGComponents/integrations";
import AnalyticsIcon from "../../assets/SVGComponents/analyticsIcon";
import AutomationIcon from "../../assets/SVGComponents/automationIcon";

// eslint-disable-next-line react/prop-types
const DashBoard = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const { openMenu, login, setOpenMenu } = useStateContext();
  return (
    <>
      {login ?
        <Container>
          <TopBar />
          <DashBoardContainer>
            <DashContent openmenu={openMenu} onMouseMove={() => setOpenMenu(true)} onMouseLeave={() => setOpenMenu(false)}>
              <div>
                <MenuContainer>
                  <Link to='fluxograms'>
                    <MenuItem onClick={() => setPath("/dashboard/fluxograms/")} active={path.includes("/dashboard/fluxograms")} openmenu={openMenu}>
                      <div>
                        <FluxogramIcon color={path.includes("/dashboard/fluxograms") ? "#1B192E" : "#A0B4D1"} />
                      </div>
                      <span>Fluxos de Bot</span>
                    </MenuItem>
                  </Link>

                  <Link to='schedules'>
                    <MenuItem onClick={() => setPath("/dashboard/schedules")} active={path.includes("/dashboard/schedules")} openmenu={openMenu}>
                      <div>
                        <CalendarIcon color={path.includes("/dashboard/schedules") ? "#1B192E" : "#A0B4D1"} />
                      </div>
                      <span>Agendas</span>
                    </MenuItem>
                  </Link>

                  <Link to='leads'>
                    <MenuItem onClick={() => setPath("/dashboard/leads/*")} active={path.includes("/dashboard/leads")} openmenu={openMenu}>
                      <div>
                        <LeadsIcon color={path.includes("/dashboard/leads") ? "#1B192E" : "#A0B4D1"} />
                      </div>
                      <span>Meus leads</span>
                    </MenuItem>
                  </Link>

                  <Divider></Divider>

                  <Link to='integrations'>
                    <MenuItem openmenu={openMenu} onClick={() => setPath("/dashboard/integrations")} active={path.includes("/dashboard/integrations")}>
                      <div>
                        <IntegrationsIcon color={path.includes("/dashboard/integrations") ? "#1B192E" : "#A0B4D1"} />
                      </div>
                      <span>Integrações</span>
                    </MenuItem>
                  </Link>

                  <Link>
                    {/* <Link to='analytics'> */}
                    <MenuItem
                      //  onClick={() => setPath("/dashboard/analytics")} 
                      active={path.includes("/dashboard/automations")}
                      openmenu={openMenu}
                    >
                      {/* {openMenu && <span className="shortly">Em breve</span>} */}
                      <div>
                        <AutomationIcon color={'#bfbfbf'} />
                      </div>
                      <span style={{ color: "#bfbfbf" }} >Automações</span>
                    </MenuItem>
                  </Link>

                  <Link>
                    {/* <Link to='analytics'> */}
                    <MenuItem
                      //  onClick={() => setPath("/dashboard/analytics")} 
                      active={path.includes("/dashboard/analytics")}
                      openmenu={openMenu}
                    >
                      {/* {openMenu && <span className="shortly">Em breve</span>} */}
                      <div>
                        <AnalyticsIcon color={'#bfbfbf'} />
                      </div>
                      <span style={{ color: "#bfbfbf" }} >Analytics</span>
                    </MenuItem>
                  </Link>

                </MenuContainer>
              </div>
            </DashContent>
            <div style={{ flex: 1, background: 'transparent' }}>
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