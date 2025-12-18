import React, { useState } from "react";
import { useMusic } from "../context/MusicContext";

function Playlists() {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { playlists, createPlaylist } = useMusic();
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  };

  return (
    <div className="playlists">
      <h2>play lists</h2>
      <div className="create-playlist">
        <h3>create new playlist</h3>
        <div className="playlist-form">
          <input
            type="text"
            placeholder="playlist name..."
            className="playlist-input"
            onChange={(e) => setNewPlaylistName(e.target.value)}
            value={newPlaylistName}
          />
          <button className="create-btn" onClick={handleCreatePlaylist}>
            Create
          </button>
        </div>
      </div>
      <div className="playlists-list">
        {playlists.length === 0 ? (
          <p className="empty-message"> no playlist created yet </p>
        ) : (
          playlists.map((playlist, key) => (
            <div className="playlist-item" key={key}>
              <div className="playlist-header">
                <h3>{playlist.name}</h3>
                <div className="playlist-actions">
                  <button className="delete-playlist-btn">Delete</button>
                </div>
              </div>
              {/* add song search*/}
              <div className="add-song-section">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="search songs to add .."
                    value={
                      selectedPlaylist?.id === playlist.id ? searchQuery : ""
                    }
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedPlaylist(playlist);
                      setShowDropdown(e.target.value.lengh > 0);
                    }}
                    onFocus={() => {
                      setSelectedPlaylist(playlist);
                      setShowDropdown(e.target.value.lengh > 0);
                    }}
                    className="song-search-input"
                  />
                  {selectedPlaylist?.id === playlist.id && showDropdown && (
                    <div className="song-dropdown">
                       
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Playlists;
