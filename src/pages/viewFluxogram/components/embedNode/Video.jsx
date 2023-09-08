import { BubleText } from "./styles";

function EmbedNode({ data }) {
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
                    src={data.value}
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

export default EmbedNode;
