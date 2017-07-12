import React, { Component } from 'react';
import { Link } from 'react-router-dom';

let Header = (props) => {
  return (
    <div>
      <ul>
        <Link id="postJob" to="/PostJob"><button>PostJob</button></Link>
        <Link id="viewJob" to="/ViewJob"><button>ViewJob</button></Link>
      </ul>
    </div>
  )
}

export default Header;