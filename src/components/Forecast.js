import React from 'react';
import CurrentConditions from './CurrentConditions'
import ForecastDay from './ForecastDay';

const Forecast = (props) => (
  <div>
    {
      <CurrentConditions
        currentTemperature={props.currentConditions.temp_f}
        currentIconSrc={props.currentConditions.condition.icon}
        currentWeather={props.currentConditions.condition.text}
        currentDate={props.forecast[0].date}
        currentHigh={props.forecast[0].day.maxtemp_f}
        currentLow={props.forecast[0].day.mintemp_f}
      />
    }
    {
      props.forecast.map((day, index) => {
        if (index !== 0) {
          return (
            <ForecastDay 
              key={day.date}
              date={day.date} 
              conditions={day.day.condition.text} 
              imgsrc={day.day.condition.icon}
              high={day.day.maxtemp_f}
              low={day.day.mintemp_f}
            />
          )
        }        
      })
    }
  </div>      
);

export default Forecast;