import React from 'react';
import moment from 'moment';

const CurrentConditions = (props) => (
  <div>
    <h2>{props.currentTemperature}&deg;</h2>
    <p><img src={props.currentIconSrc} /></p>
    <p>{props.currentWeather}</p>
    <p>{moment(props.currentDate).format('ddd, MMMM Do YYYY')}</p>   
    <p>{props.currentHigh}&deg;/{props.currentLow}&deg;</p> 
  </div>
);

export default CurrentConditions;