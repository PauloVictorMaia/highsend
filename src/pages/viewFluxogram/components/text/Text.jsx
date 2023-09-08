import { useEffect, useState } from "react";
import { BubleText } from "./styles";

function Text({ data, variables }) {
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    let newStr = data.value;
  
    variables.forEach(variable => {
      const regex = new RegExp(`{{${variable.name}}}`, 'g');
      newStr = newStr.replace(regex, variable.value);
    });

    setTextValue(newStr)
  },[])

  return (
    <BubleText>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="chat-thread">
              <div className="message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <p>{textValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BubleText>
  )
}

export default Text;
