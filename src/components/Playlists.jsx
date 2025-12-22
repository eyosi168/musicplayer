import React, { useState } from "react";
import { useMusic } from "../context/MusicContext";

function Playlists() {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    playlists,
    createPlaylist,
    allSongs,
    addSongToPlaylist,
    currentTrackIndex,
    setCurrentTrack,
    handlePlaySong,
    deletePlaylist
  } = useMusic();
  const filteredSongs = allSongs.filter((song) => {
    const matches =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());

    const isAlreadyInplaylist = selectedPlaylist?.songs.some(
      (playlistSong) => playlistSong.id === song.id
    );

    return matches && !isAlreadyInplaylist;
  });
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  };
  const handleAddSong = (song) => {
    if (selectedPlaylist) {
      addSongToPlaylist(selectedPlaylist.id, song);
      setSearchQuery("");
      setShowDropdown(false);
    }
  };
  const handlePlayFromPlaylist = (song)=>{
    const globalIndex = allSongs.findIndex((s)=> s.id === song.id)
    handlePlaySong(song,globalIndex)
  }
  const deletePlaylistConformation= (playlist)=>{
    if(window.confirm(`are you sure to delete "${playlist.name}"?`)){
      deletePlaylist(playlist.id)
    }
  }

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
                  <button className="delete-playlist-btn" onClick={()=>deletePlaylistConformation(playlist)}>Delete</button>
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
                      setShowDropdown(e.target.value.length > 0);
                    }}
                    onFocus={(e) => {
                      setSelectedPlaylist(playlist);
                      setShowDropdown(e.target.value.length > 0);
                    }}
                    className="song-search-input"
                  />
                  {selectedPlaylist?.id === playlist.id && showDropdown && (
                    <div className="song-dropdown">
                      {filteredSongs.length === 0 ? (
                        <div className="dropdown-item no-results">
                          {" "}
                          no songs found
                        </div>
                      ) : (
                        filteredSongs.slice(0, 5).map((song, key) => (
                          <div
                            key={key}
                            className="dropdown-item"
                            onClick={() => handleAddSong(song)}
                          >
                            <span className="song-title"> {song.title}</span>
                            <span className="song-artist">{song.artist}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="playlist-songs">
                {playlist.songs.length === 0 ? (
                  <p className="empty-playlist"> no song in this playlist</p>
                ) : (
                  playlist.songs.map((song, key) => (
                    <div
                      key={key}
                      className={`playlist-song ${
                        currentTrackIndex ===
                        allSongs.findIndex((s) => s.id === song.id)
                          ? "active"
                          : ""
                      }`}
                      onClick={()=> handlePlayFromPlaylist(song)}
                    >
                      <div className="song-info">
                        <span className="song-title">{song.title}</span>
                        <span className="song-artist"> {song.artist}</span>
                      </div>
                      <span className="song-duration">{song.duration}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Playlists;
