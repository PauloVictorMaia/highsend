import styled from 'styled-components';

const AccordionContainer = styled.div`
  border: 1px solid #14140F;
  border-radius: 6px;
  width: 100%;
  margin: 15px 0;
  background-color: #fff;
`;

const AccordionHeader = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  height: 60px;
  display: flex;
  align-items: center;
`;

const AccordionContent = styled.div`
  max-height: ${(props) => (props.isOpen ? 'auto' : '0')};
  padding: ${(props) => (props.isOpen ? '10px 15px' : '0 15px')};
`;

const Accordion = ({ title, open, children, onClick }) => {
  return (
    <AccordionContainer>
      <AccordionHeader onClick={onClick}>
        {title}
      </AccordionHeader>
      {open &&
        <AccordionContent isOpen={open}>
          {children}
        </AccordionContent>
      }
    </AccordionContainer>
  );
};

export default Accordion;
