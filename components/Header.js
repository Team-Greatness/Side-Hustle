import React, { Component } from 'react';
import { Link } from 'react-router-dom';

let Header = (props) => {
  return (
    <div>
      <ul>
        <Link to="/PostJob"><button>PostJob</button></Link>
        <Link to="/ViewJob"><button>ViewJob</button></Link>
      </ul>
    </div>
  )
}

export default Header;