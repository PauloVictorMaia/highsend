import {
  DashBoardContainer,
  DashContent,
  MenuContainer,
  MenuItem,
  IconsContainer,
  Link,
  IconContainer
} from "./style";
import { TiFlowSwitch } from "react-icons/Ti";
import { TfiAgenda } from "react-icons/Tfi";
import { FiSettings } from "react-icons/Fi";
import { BsFillPeopleFill } from "react-icons/Bs";
import { BiChat } from "react-icons/Bi";
import { TbDeviceAnalytics } from "react-icons/Tb";
import { useStateContext } from "../../contexts/ContextProvider";
import CloseIcon from '@mui/icons-material/Close';

// eslint-disable-next-line react/prop-types
const DashBoard = ({ children }) => {

  const { openMenu, setOpenMenu } = useStateContext()

  return (

    <DashBoardContainer>
      {openMenu &&
        <IconContainer onClick={() => setOpenMenu(!openMenu)} >
          <CloseIcon />
        </IconContainer>
      }
      <DashContent onMouseMove={() => setOpenMenu(true)} openmenu={openMenu}>
        <div>
          <h2>High Send</h2>
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

          </MenuContainer>
        </div>
        <IconsContainer>
          <FiSettings size={30} />
          <BiChat size={30} />
        </IconsContainer>
      </DashContent>
      <div style={{ flex: 1, background: '#e6e6e6' }}>
        {children}
      </div>
    </DashBoardContainer>
  )
}

export default DashBoard;