import styled from 'styled-components';

const AccordionContainer = styled.div`
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 6px;
  width: 100%;
  margin-top: 15px;
  background-color: #fff;
`;

const AccordionHeader = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  height: 60px;
  display: flex;
  align-items: center;

  span {
    margin-left: 20px;
    font-size: 18px;
  }
`;

const AccordionContent = styled.div`
  max-height: ${(props) => (props.isOpen ? 'auto' : '0')};
  padding: ${(props) => (props.isOpen ? '10px 15px' : '0 15px')};
`;

const Accordion = ({ title, open, children, onClick, icon }) => {
  return (
    <AccordionContainer>
      <AccordionHeader onClick={onClick}>
        {icon}
        <span>{title}</span>
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
