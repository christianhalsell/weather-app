import React from 'react';
import moment from 'moment';

const ForecastDay = (props) => (
  <div>
    {moment(props.date).format('ddd, MMMM Do YYYY')} {props.conditions} <img src={props.imgsrc} width="32" height="32" /> High: {props.high} Low: {props.low}
  </div>
);

export default ForecastDay;