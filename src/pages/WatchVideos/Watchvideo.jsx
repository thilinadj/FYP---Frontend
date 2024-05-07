import React, { useEffect, useState } from 'react';
import './Watchvideos.css';
import Navbar from '../NavBar/Navbar';

const WatchVideos = () => {
  const [videoTitles, setVideoTitles] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideoTitles = () => {
    fetch('http://127.0.0.1:5000/api/videos')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch video titles');
        }
        console.log(res);
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
    // Fetch the video corresponding to the selected title
    fetch(`http://127.0.0.1:5000/api/video/${title}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch video');
        }
        return res.json();
      })
      .then(data => {
        let url = data.videoUrl;
        const lastIndex = url.lastIndexOf('/'); 

        const endPart = url.substring(lastIndex + 1);
        setSelectedVideo(endPart);
      })
      .catch(err => {
        console.error('Error fetching video:', err);
        setSelectedVideo(null);
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
        {selectedVideo && (
          <div className="video-player-container">
            
            <h2>Now Playing: {selectedVideo}</h2>
            <video src={require(`../../video_save/${selectedVideo}`)} controls autoPlay width={400} height={400} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchVideos;
