// MusicPlayer.js
import React from "react";
import useMusic from "../hooks/useMusic";

function MusicPlayer() {
  const { currentTrack, formatTime, currentTime, duration } = useMusic(); // this will always be songs[0] here

  if (!currentTrack) return null;

  return (
    <div className="music-player">
      <audio />
      <div className="track-info">
        <h3 className="track-title">{currentTrack.title}</h3>
        <p className="track-artist">{currentTrack.artist}</p>
      </div>
      <div className="progress-container">
        <span className="time"> {formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime || 0}
          className="progress-bar"
        />
        <span className="time"> {formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default MusicPlayer;
