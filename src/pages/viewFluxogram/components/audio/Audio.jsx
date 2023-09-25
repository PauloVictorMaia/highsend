import { useRef, useState, useEffect } from 'react';
import { BubleText, AudioControl, AudioButton, AudioBarComponent, AudioProgress } from './styles';

function Audio({ data }) {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef) {
        const playedSeconds = audioRef.current.currentTime;
        const totalSeconds = audioRef.current.duration;
        const percentagePlayed = (playedSeconds / totalSeconds) * 100;
        setProgress(percentagePlayed);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handleMetadataLoaded = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgress);
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

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
                  <AudioControl>
                    <AudioButton onClick={handlePlayPause}>
                      {isPlaying ? '⏸️' : '▶️'}
                    </AudioButton>
                    <audio hidden ref={audioRef} src={data.value} />
                    <audio  ref={audioRef} src={data.value} />
                    <AudioBarComponent>
                      <AudioProgress percentage={progress} />
                    </AudioBarComponent>
                    {duration && <span>{formatTime(duration)}</span>}
                  </AudioControl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BubleText>
  );
}
export default Audio;
