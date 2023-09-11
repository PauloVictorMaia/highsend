import { BubleText } from "./styles";

function Video({ data }) {
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
                  <iframe
                    className="video"
                    src={data.value.replace("youtube.com/watch?v=", "youtube.com/embed/")}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BubleText>

  );
}

export default Video;
