import { useEffect, useState } from "react";
import { BubleText, MessageContent, MessageContainer } from "./styles";
import { useRef } from "react";

function Text({ data, variables }) {
  const elementRef = useRef(null);
  const [textValue, setTextValue] = useState('');
  const [showTyping, setShowTyping] = useState(true);
  const [elementHeight, setElementHeight] = useState(0);

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

  useEffect(() => {
    const calculateAndSetHeight = () => {
      if (elementRef.current) {
        setElementHeight(elementRef.current.offsetHeight);
      }
    };

    setTimeout(calculateAndSetHeight, 50);
    return () => clearTimeout(calculateAndSetHeight);
  }, []);

  return (
    <BubleText>
      <div className="message">
        <MessageContainer>
          <MessageContent height={elementHeight} typing={showTyping} className="message-content">
            {showTyping ?
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              :
              <p>{textValue}</p>
            }
          <p className="offscreen" ref={elementRef}>{textValue}</p>
          </MessageContent>
        </MessageContainer>
      </div>
    </BubleText>
  )
}

export default Text;
