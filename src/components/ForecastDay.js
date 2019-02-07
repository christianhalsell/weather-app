import React from 'react';
import moment from 'moment';

const ForecastDay = (props) => (
  <div className="forecast-day">
    <div>
      {moment(props.date).format('ddd, MMMM Do')}
    </div>
    
    <div className="forecast-day__conditions">
      <span className="forecast-day__conditions-display">{props.conditions}</span>
      <img className="forecast-day__conditions-icon" src={props.imgsrc} width="32" height="32" title={props.conditions} />
      {props.high}&deg; / {props.low}&deg;
    </div>    
  </div>
);

export default ForecastDay;