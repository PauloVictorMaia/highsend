import { useRef, useState, useEffect } from 'react';
import { BubleText, AudioControl, AudioButton, AudioBarComponent, AudioProgress, MessageContent, MessageContainer } from './styles';

function Audio({ data }) {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTyping, setShowTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef) {
        const playedSeconds = audioRef.current?.currentTime;
        const totalSeconds = audioRef.current?.duration;
        const percentagePlayed = (playedSeconds / totalSeconds) * 100;
        setProgress(percentagePlayed);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    setDuration(audioRef?.current?.duration);
    audioRef?.current?.addEventListener('timeupdate', updateProgress);
    audioRef?.current?.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', updateProgress);
      audioRef.current?.removeEventListener('ended', handleEnded);
    };
  }, [audioRef?.current, data.value]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
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
              <AudioControl>
                <AudioButton onClick={handlePlayPause}>
                  {isPlaying ? '⏸️' : '▶️'}
                </AudioButton>
                <audio hidden ref={audioRef} controls src={data.value} type="audio/mpeg" />
                <AudioBarComponent>
                  <AudioProgress percentage={progress} />
                </AudioBarComponent>
                {duration && <span>{formatTime(duration)}</span>}
              </AudioControl>
            }
          </MessageContent>
        </MessageContainer>
      </div>
    </BubleText>
  );
}
export default Audio;
