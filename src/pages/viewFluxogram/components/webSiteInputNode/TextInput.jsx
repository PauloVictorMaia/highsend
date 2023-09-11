import { Container, Text, InputContainer } from './styles';

function WebSiteInputNode({ data, onSend, onChange, variables }) {
  const filteredVariable = variables.filter((variable) => variable.id === data.variable);

  return (
    <Container>
      {filteredVariable[0]?.done ?
        <Text>
          {filteredVariable[0].value}
        </Text>
        :
        <InputContainer>
          <input
            placeholder={data.placeholder}
            onChange={onChange}
            value={filteredVariable.value}
            type="text"
          />
          <button onClick={() => onSend()}>{data.buttonLabel}</button>
        </InputContainer>
      }
    </Container>
  );
}

export default WebSiteInputNode;
