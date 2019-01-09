import React from 'react';
import CurrentConditions from './CurrentConditions'
import ForecastDay from './ForecastDay';

const Forecast = (props) => {
  return (
    <div>
      <p>Forecast for {props.location.name }, {props.location.region}</p>
      {
        <CurrentConditions
          currentTemperature={props.currentConditions.temp_f}
          currentIconSrc={props.currentConditions.condition.icon}
          currentWeather={props.currentConditions.condition.text}
        />
      }
      {
        props.forecast.map((day) => {
          return (
            <ForecastDay 
              key={day.date}
              day={day.date} 
              conditions={day.day.condition.text} 
              imgsrc={day.day.condition.icon}
              high={day.day.maxtemp_f}
              low={day.day.mintemp_f}
            />
          )
        })
      }
    </div>      
  );
}

export default Forecast;