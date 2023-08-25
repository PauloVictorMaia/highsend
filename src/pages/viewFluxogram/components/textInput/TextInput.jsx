function TextInput({ data, onSend, onChange, variables }) {
    const filteredVariable = variables.filter((variable) => variable.id === data.variable);

    return (
        <div>
            <input
                onChange={onChange}
                value={filteredVariable.value}
                type="text"
            />
            <button onClick={() => onSend()}>{data.buttonLabel}</button>
        </div>
    );
}

export default TextInput;
