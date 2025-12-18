import React from "react";
import { useMusic } from "../context/MusicContext";

function AllSongs() {
  const { allSongs, handlePlaySong, currentTrackIndex } = useMusic();

  return (
    <div className="all-songs">
      <h2>All songs ({allSongs.length})</h2>

      <div className="songs-grid">
        {allSongs.map((song, key) => (
          <div
            className={`song-card  ${
              currentTrackIndex === key ? "active" : ""
            }`}
            key={key}
            onClick={() => handlePlaySong(song, key)}
          >
            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <p className="song-artist">{song.artist}</p>
              <span className="song-duration">{song.duration}</span>
            </div>
            <div className="play-button">
              {currentTrackIndex===key? "s":'<>'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllSongs;
