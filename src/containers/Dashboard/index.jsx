import { DashBoardContainer, DashContent, MenuContainer, MenuItem, IconsContainer } from "./style";
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

  const { openMenu } = useStateContext()

  return (
    <DashBoardContainer>
      <DashContent openmenu={openMenu ? "true" : "false"}>
        <div>
          <h2>High Send</h2>
          <MenuContainer>
            <MenuItem>
              <TiFlowSwitch size={20} />
              <span>Fluxos de Bot</span>
            </MenuItem>
            <MenuItem>
              <TfiAgenda size={20} />
              <span>Agendas</span>
            </MenuItem>
            <MenuItem>
              <BsFillPeopleFill size={20} />
              <span>Meus leads</span>
            </MenuItem>
            <MenuItem>
              <TbDeviceAnalytics size={20} />
              <span>Analytics</span>
            </MenuItem>
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