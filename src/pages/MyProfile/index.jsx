import CustomPageHeader from "../../components/CustomPageHeader";
import { myProfileMenu } from "../../data/menus";
import { useState } from "react";
import ContentPageContainer from "../../containers/ContentPageContainer";
import ProfileData from "./ProfileData";
import ProfilePlan from "./ProfilePlan";

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
        <ProfileData />
      }

      {menuComponent == 1 &&
        <ProfilePlan />
      }

    </ContentPageContainer>
  )
}

export default MyProfile;