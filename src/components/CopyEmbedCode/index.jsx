import { useState } from 'react';
import styled from 'styled-components';
import clipboardCopy from 'clipboard-copy';
import { IconButton, Tooltip } from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';

const CodeBlock = styled.pre`
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 10px;
    background-color: #f5f5f5;
    overflow: auto;
    position: relative;
    font-size: 14px;
    font-family: 'Courier New', monospace;
    max-height: 300px;
    overflow-y: auto;
`;

const ButtonContainer = styled.div`
 position: sticky;
 display: flex;
 justify-content: flex-end;
 top: 0;
 left: 0;
 width: 100%;
`;

const CopyButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  width: 50px;
`;

const CopyEmbed = ({ flowId, userId }) => {
  const [isCopied, setIsCopied] = useState(false);

  const chatScript = `
<script>
(function () {
  var styles = \`
    #chatIcon {
        width: 50px;
        height: 50px;
        background-image: url('https://img.icons8.com/?size=50&id=2951&format=png');
        background-size: cover;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: fixed;
        bottom: 20px;
        right: 20px;
        cursor: pointer;
        font-family: Arial, sans-serif;
    }
    #chatWindow {
        width: 370px;
        height: 550px;
        background-color: white;
        border: 1px solid #ccc;
        position: fixed;
        bottom: 80px;
        right: 50px;
        display: none;
        overflow: hidden;
        border-radius: 8px;
    }
    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
    #chatIcon .notification {
      width: 15px;
      height: 15px;
      background-color: #33ff99;
      border-radius: 50%;
      position: absolute;
      top: 5px;
      left: -5px;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @media (max-width: 768px) {
        #chatIcon {
            width: 70px;
            height: 70px;
            bottom: 30px;
            right: 30px;
        }
        #chatWindow {
            width: 90%;
            height: 70%;
            bottom: 8%;
            right: 5%;
        }
    }
  \`;

  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  var chatIcon = document.createElement('div');
  chatIcon.id = 'chatIcon';
  document.body.appendChild(chatIcon);

  var chatWindow = document.createElement('div');
  chatWindow.id = 'chatWindow';
  document.body.appendChild(chatWindow);

  var notificationBadge = document.createElement('div');
  notificationBadge.className = 'notification';
  chatIcon.appendChild(notificationBadge);

  chatIcon.onclick = function () {
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
      chatWindow.style.display = 'block';
      notificationBadge.style.display = 'none';
      if (!chatWindow.querySelector('iframe')) {
        var iframe = document.createElement('iframe');
        iframe.src = '${import.meta.env.VITE_OPEN_FRONT_URL}/fluxo-de-bot/${userId}/${flowId}'; 
        chatWindow.appendChild(iframe);
      }
    } else {
      chatWindow.style.display = 'none';
    }
  };
})();
</script>
`;

  const handleCopy = () => {
    try {
      clipboardCopy(chatScript);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success("Script copiado com sucesso!")
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <CodeBlock>
        <ButtonContainer>
          <Tooltip title="Copiar código">
            <CopyButton onClick={handleCopy} size="large">
              <CopyIcon fontSize="inherit" />
            </CopyButton>
          </Tooltip>
        </ButtonContainer>
        {chatScript}
      </CodeBlock>
      {isCopied && <p>Código copiado!</p>}
    </div>
  );
};

export default CopyEmbed;
