import { DashBoardContainer, DashContent, MenuContainer, MenuItem, IconsContainer, Link } from "./style";
import { TiFlowSwitch } from "react-icons/Ti";
// import { AiOutlineMenu } from "react-icons/Ti";
import { TfiAgenda } from "react-icons/Tfi";
import { FiSettings } from "react-icons/Fi";
import { BsFillPeopleFill } from "react-icons/Bs";
import { BiChat } from "react-icons/Bi";
import { TbDeviceAnalytics } from "react-icons/Tb";
import { useStateContext } from "../../contexts/ContextProvider";

// eslint-disable-next-line react/prop-types
const DashBoard = ({ children }) => {

  const { openMenu, setOpenMenu } = useStateContext()

  return (
    <DashBoardContainer>
      <DashContent openmenu={openMenu ? "true" : "false"}>
        <div>
          <h2>High Send</h2>
          <MenuContainer>

            <Link to='fluxograms' onClick={() => setOpenMenu(false)}>
              <MenuItem>
                <TiFlowSwitch size={20} />
                <span>Fluxos de Bot</span>
              </MenuItem>
            </Link>

            <Link to='schedules' onClick={() => setOpenMenu(false)}>
              <MenuItem>
                <TfiAgenda size={20} />
                <span>Agendas</span>
              </MenuItem>
            </Link>

            <Link to='leads' onClick={() => setOpenMenu(false)}>
              <MenuItem>
                <BsFillPeopleFill size={20} />
                <span>Meus leads</span>
              </MenuItem>
            </Link>

            <Link to='analytics' onClick={() => setOpenMenu(false)}>
              <MenuItem>
                <TbDeviceAnalytics size={20} />
                <span>Analytics</span>
              </MenuItem>
            </Link>

          </MenuContainer>
        </div>
        <IconsContainer>
          <FiSettings size={30} />
          <BiChat size={30} />
        </IconsContainer>
      </DashContent>
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </DashBoardContainer>
  )
}

export default DashBoard;