/* eslint-disable react/prop-types */
import { Ring } from "@uiball/loaders";
import { HeaderContainer, TitleHeader, MenuItems, Item, ItemElement, Button, ContentHeader } from "./styles";

function CustomPageHeader({ menu, setMenuComponent, menuComponent, button, name, buttonName, isLoading }) {
  return (
    <HeaderContainer>
      <TitleHeader>{name}</TitleHeader>
      <ContentHeader>
        {menu &&
          <MenuItems>
            {menu.map((item, index) => (
              <ItemElement onClick={() => setMenuComponent(index)} key={index}>
                <Item active={menuComponent == index} >{item.name}</Item>
              </ItemElement>
            ))}
          </MenuItems>
        }
        {button &&
          <Button onClick={button}>
            {isLoading ? <Ring color="#fff" size={25} /> : buttonName}
          </Button>
        }
      </ContentHeader>
    </HeaderContainer>
  )
}

export default CustomPageHeader;