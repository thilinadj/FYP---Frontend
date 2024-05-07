import React, { useEffect, useState } from 'react';
import './Watchvideos.css';
import Navbar from '../NavBar/Navbar';

const WatchVideos = () => {
  const [videoTitles, setVideoTitles] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);
  const [selectedVideoURL, setSelectedVideoURL] = useState(null);

  const fetchVideoTitles = () => {
    fetch('http://127.0.0.1:5000/api/videos')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch video titles');
        }
        return res.json();
      })
      .then(data => {
        setVideoTitles(data);
        setFetchError(null);
      })
      .catch(err => {
        console.error('Error fetching video titles:', err);
        setVideoTitles([]);
        setFetchError('Failed to fetch video titles. Please try again.');
      });
  };
  
  useEffect(() => {
    fetchVideoTitles();
  }, []);

  const playVideo = (title) => {
    fetch(`http://127.0.0.1:5000/api/video/${title}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch video');
        }
        return res.blob();
      })
      .then(blob => {
        let url = URL.createObjectURL(blob);
        setSelectedVideoURL(url);
        setSelectedVideoTitle(title)
      })
      .catch(err => {
        console.error('Error fetching video:', err);
        setSelectedVideoURL(null);
      });
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='app__watchvideos'>
        <div className='video-titles-container'>
          <h2>Video Titles</h2>
          {fetchError && <p className="error-message">{fetchError}</p>}
          <ul>
            {videoTitles?.map((title, index) => (
              <li key={index} onClick={() => playVideo(title)}>
                {title}
              </li>
            ))}
          </ul>
        </div>
        {selectedVideoURL && (
          <div className="video-player-container">
            <h2>Now Playing: {selectedVideoTitle}</h2>
            <video controls width={400} height={400}>
                <source src={selectedVideoURL} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchVideos;
