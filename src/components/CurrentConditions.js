import React from 'react';
import moment from 'moment';

const CurrentConditions = (props) => (
  <div className="current-conditions">
    <div className="current-conditions__summary">
      <div><img src={props.currentIconSrc} /></div>
      <div>{props.currentWeather}</div>
      <div>{moment(props.currentDate).format('ddd, MMMM Do YYYY')}</div>
    </div>  
    
    <div className="current-conditions__details">
      <div className="current-conditions__temperature">{props.currentTemperature}&deg;</div>   
      <div className="current-conditions__high-low">{props.currentHigh}&deg;/{props.currentLow}&deg;</div> 
    </div>    
  </div>
);

export default CurrentConditions;