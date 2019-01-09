import React from 'react';

const ForecastDay = (props) => {
  return (
    <div>
      {props.day} {props.conditions} <img src={props.imgsrc} width="32" height="32" /> High: {props.high} Low: {props.low}
    </div>
  );
};

export default ForecastDay;