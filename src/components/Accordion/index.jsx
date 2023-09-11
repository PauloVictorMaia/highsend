import styled from 'styled-components';

const AccordionContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  margin: 15px 0;
`;

const AccordionHeader = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  background-color: #f5f5f5;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const AccordionContent = styled.div`
  max-height: ${(props) => (props.isOpen ? '300px' : '0')};
  overflow: hidden;
  padding: ${(props) => (props.isOpen ? '10px 15px' : '0 15px')};
`;

const Accordion = ({ title, open, children, onClick }) => {
  return (
    <AccordionContainer>
      <AccordionHeader onClick={onClick}>
        {title}
      </AccordionHeader>
      <AccordionContent isOpen={open}>
        {children}
      </AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;
