/* eslint-disable react/prop-types */
import { HeaderContainer, TitleHeader, MenuItems, Item, ItemElement, Button, ContentHeader } from "./styles";

function CustomPageHeader({ menu, setMenuComponent, menuComponent, button, name, buttonName }) {
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
            {buttonName}
          </Button>
        }
      </ContentHeader>
    </HeaderContainer>
  )
}

export default CustomPageHeader;