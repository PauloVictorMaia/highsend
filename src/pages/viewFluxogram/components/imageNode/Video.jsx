import { BubleText } from "./styles";

function ImageNode({ data }) {
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
                  <img
                    className="image"
                    src={data.value}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BubleText>

  );
}

export default ImageNode;
