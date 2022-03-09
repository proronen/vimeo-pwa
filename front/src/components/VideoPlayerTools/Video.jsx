import { CircularProgress } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { PauseButton, PlayButton } from "./buttons";

const Video = (props) => {
  const vidRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setIsPlaying(false);
  }, [props.data.cdnpath]);

  useEffect(() => {
    if (isPlaying) {
      vidRef.current.play();
    } else {
      vidRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleDuration = (e) => {
    if (!isNaN(vidRef.current.duration)) setDuration(vidRef.current.duration);
  };

  return (
    <div className="video-player-inner-cont">
      {!props.vidLoader && (
        <div className="controls-cont">
          <div className="play-btn" onClick={() => handlePlayPause()}>
            {!isPlaying && <PlayButton />}
            {isPlaying && <PauseButton />}
          </div>
          <ProgressBar playPause={isPlaying} ref={vidRef} duration={duration} />
        </div>
      )}
      {props.vidLoader && (
        <div className="vidLoader">
          <CircularProgress />
        </div>
      )}
      <video
        ref={vidRef}
        style={{
          width: "100%",
          height: "540px",
          opacity: props.vidLoader ? 0.3 : 1,
        }}
        key={props.data.cdnpath}
        onDurationChange={(e) => handleDuration(e)}
      >
        <source src={props.data.cdnpath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && vidRef.current && vidRef.current.currentTime === 0 && (
        <div
          className="splash-screen"
          style={{
            background: `url(${props.data.pictures.base_link})`,
            opacity: props.vidLoader ? 0.3 : 1,
          }}
        ></div>
      )}
    </div>
  );
};

export default Video;
