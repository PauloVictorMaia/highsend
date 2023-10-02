import { Button, Container } from './styles';

function LinkButton({ data }) {
  const onClickButton = () => {
    let url = data.value;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    window.location.href = url;
  }

  return (
    <Container>
      <Button value={data.buttonLabel} onClick={() => onClickButton()}>{data.buttonName}</Button>
    </Container>
  );
}

export default LinkButton;
