import React from 'react';

const CurrentConditions = (props) => {
  return (
    <div>
      <h2>{props.currentTemperature}&deg;</h2>
      <p>{props.currentWeather} <img src={props.currentIconSrc} /></p>        
    </div>
  );
};

export default CurrentConditions;