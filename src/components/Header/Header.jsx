import { HeaderContainer } from "./Header.style";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useStateContext } from "../../contexts/ContextProvider";

function Header() {

  const { openMenu, setOpenMenu } = useStateContext()

  return (
    <HeaderContainer>
      {openMenu ?
        <CloseIcon onClick={() => setOpenMenu(!openMenu)} />
        :
        <MenuIcon onClick={() => setOpenMenu(!openMenu)} />
      }
    </HeaderContainer>
  )
}

export default Header;