import { useEffect, useState } from "react";
import { BubleText, MessageContent, MessageContainer } from "./styles";

function Text({ data, variables }) {
  const [textValue, setTextValue] = useState('');
  const [showTyping, setShowTyping] = useState(true);

  useEffect(() => {
    let newStr = data.value;

    variables.forEach(variable => {
      const regex = new RegExp(`{{${variable.name}}}`, 'g');
      newStr = newStr.replace(regex, variable.value);
    });

    setTextValue(newStr)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BubleText>
      <div className="message">
        <MessageContainer>
          <MessageContent typing={showTyping} className="message-content">
            {showTyping ?
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              :
              <p>{textValue}</p>
            }
          </MessageContent>
        </MessageContainer>
      </div>
    </BubleText>
  )
}

export default Text;
