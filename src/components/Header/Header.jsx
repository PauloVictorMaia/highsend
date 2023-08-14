import { HeaderContainer } from "./Header.style";
import MenuIcon from '@mui/icons-material/Menu';
import { useStateContext } from "../../contexts/ContextProvider";
import CloseIcon from '@mui/icons-material/Close';

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