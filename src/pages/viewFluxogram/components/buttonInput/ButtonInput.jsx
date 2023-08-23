function ButtonInput({ data, onSend }) {
  return <p onClick={() => onSend()}>{data.buttonLabel}</p>;
}

export default ButtonInput;
