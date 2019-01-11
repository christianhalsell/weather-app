import React from 'react';

const Header = (props) => (
  <div>
    <h1>{props.title}</h1>
    <p>{props.subtitle}</p>
    <button onClick={props.openInputModal}>Mobile Input</button>
  </div>
);

export default Header;