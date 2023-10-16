import {
  ContentContainer,
  PageContent,
  HeaderContent
} from "./style";

// eslint-disable-next-line react/prop-types
const ContentPageContainer = ({ children, header }) => {
  return (
    <ContentContainer>
      {header &&
        <HeaderContent>
          <PageContent>
            {header}
          </PageContent>
        </HeaderContent>
      }
      <PageContent>
        {children}
      </PageContent>
    </ContentContainer>
  )
}

export default ContentPageContainer;
