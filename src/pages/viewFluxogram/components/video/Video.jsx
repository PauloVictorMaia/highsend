import { useEffect, useState } from "react";
import { BubleText, MessageContent, MessageContainer } from "./styles";
import DOMPurify from 'dompurify';

function Video({ data }) {
  const [showTyping, setShowTyping] = useState(true);
  const [hasReachedTargetTime, setHasReachedTargetTime] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("youtube.com/watch?v=", "youtube.com/embed/") + "?autoplay=1";
    } else if (url.includes("vimeo.com/")) {
      const vimeoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    }
    return url;
  };

  const getVideoHtml = () => {
    let htmlString = data.value.slice(1, -1).replace(/\\/g, '');
    const cleanHTML = DOMPurify.sanitize(htmlString);

    if (data.type === 'script') {
      const scriptRegex = /s\.src=\\"([^\\]+)\\"/;
      const match = scriptRegex.exec(data.value);
      if (match && match[1]) {
        const script = document.createElement("script");
        script.src = match[1] + "?autoplay=true";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          const video = document.querySelector('video'); // Altere o seletor conforme necessário
          if (video) {
            video.addEventListener('timeupdate', () => {
              const currentTime = video.currentTime;
              const targetTime = 10; // Defina o tempo desejado em segundos
              if (currentTime >= targetTime && !hasReachedTargetTime) {
                // Chame a função ou execute a ação desejada aqui
                console.log('Vídeo atingiu o tempo desejado:', currentTime);
                setHasReachedTargetTime(true);
                video.removeEventListener('timeupdate', checkTime); // Remova o ouvinte de eventos
              }
            });
          }
        };
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
