import React from 'react';
import moment from 'moment';

const ForecastDay = (props) => (
  <div className="forecast-day">
    <div className="forecast-day__date">
      {moment(props.date).format('ddd, MMMM Do')}
    </div>
    
    <div className="forecast-day__conditions">
      <img src={props.imgsrc} width="32" height="32" title={props.conditions} /> {props.high}&deg; / {props.low}&deg;
    </div>    
  </div>
);

export default ForecastDay;