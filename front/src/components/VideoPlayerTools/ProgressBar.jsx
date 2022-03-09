import { useState, useEffect, useRef, forwardRef } from "react";

const ProgressBar = forwardRef((props, ref) => {
  const progressRef = useRef(null);
  const [intervalId, setIntervalId] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressHover, setProgressHover] = useState(0);

  useEffect(() => {
    if (props.playPause) checkPlayPause.current(props.duration);
    else clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.duration, props.playPause]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkPlayPause = useRef((duration) => {
    const progInterval = setInterval(() => {
      if (ref.current.currentTime && duration > 0) {
        const progress = (ref.current.currentTime / duration) * 100;
        setProgress(progress);
      }
    }, 1000);
    setIntervalId(progInterval);
  });

  const handleProgressJumps = (e) => {
    const perc =
      (e.nativeEvent.offsetX / progressRef.current.clientWidth) * 100;
    ref.current.currentTime = props.duration * (perc / 100);
    setProgress(perc);
  };

  const handleProgressHover = (e) => {
    const perc =
      (e.nativeEvent.offsetX / progressRef.current.clientWidth) * 100;

    const date = new Date(0);
    date.setSeconds((props.duration * perc) / 100);
    const timeString = date.toISOString().substring(14, 19);

    setProgressHover({
      time: timeString,
      mousePos: e.nativeEvent.offsetX - 20,
    });
  };

  return (
    <>
      <div className="progress-bar-cont">
        <div
          className="progressHoverBox"
          style={{
            marginLeft: progressHover.mousePos,
          }}
        >
          {progressHover.time}
        </div>
        <div
          className="progress-jumper"
          ref={progressRef}
          onClick={(e) => handleProgressJumps(e)}
          onMouseMove={(e) => handleProgressHover(e)}
        ></div>
        <div className="progress-bar" style={{ width: progress + "%" }}></div>
      </div>
    </>
  );
});

export default ProgressBar;
