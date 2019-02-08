import React from 'react';
import InputForm from './InputForm';

const Header = (props) => {
  const title = props.location? `${props.location.name}, ${props.location.region}` : '';
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="header__title">
          {title}
          { props.error && <div>{props.error}</div> }
        </div>        
        <div className="header__desktop-form">
          <InputForm getWeather={props.getWeather} />
        </div>
        <div className="header__mobile-form" onClick={props.openInputModal}>
          <img className="header__mobile-form-image" src="/images/location-icon.png" />
        </div>
      </div>
    </div>
    
  )
};

export default Header;