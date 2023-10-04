import { useEffect, useState } from "react";
import { BubleText, MessageContent, MessageContainer } from "./styles";
import DOMPurify from 'dompurify';

function Video({ data, onSend }) {
  const [showTyping, setShowTyping] = useState(true);
  const [hasReachedTargetTime, setHasReachedTargetTime] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const targetTime = data.targetTime;
  const awaitTargetTime = data.awaitTargetTime;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentTime >= targetTime && !hasReachedTargetTime) {
      onSend();
      setHasReachedTargetTime(true);
      localStorage.setItem('alreadyElsDisplayed', true)
    }
  }, [currentTime, hasReachedTargetTime, onSend]);

  const getEmbedUrl = (url) => {
    if (!hasReachedTargetTime) {
      onSend();
      setHasReachedTargetTime(true);
    }
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("youtube.com/watch?v=", "youtube.com/embed/") + "?autoplay=1";
    } else if (url.includes("vimeo.com/")) {
      const vimeoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    }
    return url;
  };

  const getVideoHtml = () => {

    const cleanHTML = DOMPurify.sanitize(data.value);

    if (data.type === 'script') {
      const scriptRegex = /s\.src="([^]+)"/;
      const match = scriptRegex.exec(data.value);
      if (match && match[1]) {
        const script = document.createElement("script");
        script.src = match[1] + "?autoplay=true";
        script.async = true;
        document.body.appendChild(script);
        const alreadyElsDisplayed = localStorage.getItem('alreadyElsDisplayed');

        if (awaitTargetTime && !alreadyElsDisplayed) {
          script.onload = () => {
            const video = document.querySelector('video');
            if (video) {
              video.addEventListener('timeupdate', () => {
                if (video.currentTime >= targetTime && video.currentTime < targetTime + 1) {
                  setCurrentTime(video.currentTime);
                }
              });
            }
          };
        } else {
          if (!hasReachedTargetTime) {
            onSend();
            setHasReachedTargetTime(true);
          }
        }
      }
    }

    return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
  }

  return (
    <>
      {data.type === 'link' ?
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
        :
        <div style={{ margin: '10px 0' }}>{getVideoHtml()}</div>
      }
    </>
  );
}

export default Video;
