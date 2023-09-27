import { useEffect, useState } from "react";
import { BubleText, MessageContent, MessageContainer } from "./styles";

function Video({ data }) {
  const [showTyping, setShowTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("youtube.com/watch?v=", "youtube.com/embed/");
    } else if (url.includes("vimeo.com/")) {
      const vimeoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
    return url;
  };

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
                src={getEmbedUrl(data.value)}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            }
          </MessageContent>
        </MessageContainer>
      </div>
    </BubleText>
  );
}

export default Video;
