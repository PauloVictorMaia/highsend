import { useEffect, useState } from "react";
import { BubleText, MessageContent, MessageContainer } from "./styles";

function EmbedNode({ data }) {
  const [showTyping, setShowTyping] = useState(true);

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
              <iframe
                className="video"
                src={data.value}
              ></iframe>
            }
          </MessageContent>
        </MessageContainer>
      </div>
    </BubleText>
  );
}

export default EmbedNode;
