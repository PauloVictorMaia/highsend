import CustomPageHeader from "../../components/CustomPageHeader";
import { myProfileMenu } from "../../data/menus";
import { useState } from "react";
import ContentPageContainer from "../../containers/ContentPageContainer";

function MyProfile() {

  const [menuComponent, setMenuComponent] = useState(0);

  return (
    <ContentPageContainer
      header={
        <CustomPageHeader
          menu={myProfileMenu}
          name={'Meu perfil'}
          menuComponent={menuComponent}
          setMenuComponent={setMenuComponent}
        />
      }
    >


      {menuComponent == 0 &&
        <span>Dados do perfil</span>
      }
      {menuComponent == 1 &&
        <span>Meu plano</span>
      }
      {menuComponent == 2 &&
        <span>Configurações</span>
      }

    </ContentPageContainer>
  )
}

export default MyProfile;