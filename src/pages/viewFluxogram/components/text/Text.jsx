import { BubleText } from "./styles";

function Text({ data }) {
  return (
    <BubleText>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="chat-thread">
              <div className="message">
                {/* <div className="avatar"></div> */}
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <p>{data.value}</p>
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
