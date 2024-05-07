import React from 'react';
import './Uploadvideos.css';
import Navbar from '../NavBar/Navbar';
import axios from 'axios';

const UploadVideos = () => {

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/cleanse-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='app__uplaodvideos'>
        <div className='app__uploadvideos-button'>
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload Video
          </label>
          <input id="file-upload" type="file" onChange={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};

export default UploadVideos;
