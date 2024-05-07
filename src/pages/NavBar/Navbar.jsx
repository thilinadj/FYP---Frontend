import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const Upload = () => {
    navigate('/uploadvideos');
  };

  const Watch = () => {
    navigate('/watchvideos');
  };


  return(
    <div className='app__navbar'>
      <div className='app__navbar-name'>
          <p>CDL</p>
      </div>
      <div className='app__navbar-login'>
        <a  className='p__opensans' onClick={Upload}>Upload Videos</a>
        <a  className='p__opensans' onClick={Watch}>Watch Videos</a>
      </div>
    </div>
  );
};

export default Navbar;
