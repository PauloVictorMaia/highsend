import { Button, Container, Text } from './styles';

function ButtonInput({ data, onSend, variables }) {
  const filteredVariable = variables.filter((variable) => variable.id === data.variable);

  return (
    <Container>
      {filteredVariable[0]?.done?
        <>
          {filteredVariable[0].value === data.buttonLabel &&
            <Text>{data.buttonLabel}</Text>
          }
        </>
        :
        <Button value={data.buttonLabel} className='button' onClick={() => onSend()}>{data.buttonLabel}</Button>
      }
    </Container>
  );
}

export default ButtonInput;
