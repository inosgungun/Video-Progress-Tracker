import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";

const LectureVideoPage = () => {
  const playerRef = useRef(null);
  const [watchedIntervals, setWatchedIntervals] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  // Called periodically as video plays
  const handleProgress = (state) => {
    const currentTime = Math.floor(state.playedSeconds);
    const updated = addUniqueTime(currentTime);
    if (updated) {
      updateProgress();
    }
  };

  const addUniqueTime = (second) => {
    if (!watchedIntervals.includes(second)) {
      setWatchedIntervals((prev) => [...prev, second]);
      return true;
    }
    return false;
  };

  const updateProgress = () => {
    if (videoDuration > 0) {
      const uniqueSeconds = watchedIntervals.length;
      const percent = ((uniqueSeconds / videoDuration) * 100).toFixed(2);
      setProgressPercent(percent);
    }
  };

  const handleDuration = (duration) => {
    setVideoDuration(Math.floor(duration));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Lecture Video</h1>
      <div className="w-full max-w-3xl">
        <ReactPlayer
          ref={playerRef}
          url="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
          width="100%"
          height="auto"
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        <div className="mt-4 text-lg font-medium text-gray-700">
          Progress: {progressPercent}%
        </div>
      </div>
    </div>
  );
};

export default LectureVideoPage;
