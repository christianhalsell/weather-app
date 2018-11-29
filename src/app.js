import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// THIS IS FOR OFF-LINE TESTING
// import * as data from './weather.json'; // just for testing

let data;
fetch('http://api.wunderground.com/api/d4bb9fa9827c8918/forecast/q/CA/Irvine.json')
  .then((response) => response.json())
  .then((json) => json)
  .then((result) => data = result) // assign result to global variable
  .then((weather) => console.log(weather)) // show the full api response in console
  .then(() => render()) // render component
  .catch((err) => console.error(`Error: ${err.message}`));

const appRoot = document.getElementById('app');

const render = () => {
  console.log('rendering...');

  const template = (
    <div>
      <h1>Weather</h1>
      <p>Weather project</p>
  
      <div id="forecast">
      <p>Forecast</p>
      {
        data.forecast.simpleforecast.forecastday.map((day) => {
          if (day.period <= 3) {
            const displayMonth = day.date.monthname;
            const displayDay = day.date.day;
            const displayConditions = day.conditions;
            const displayIconUrl = day.icon_url;
            
            return (
              <div key={displayDay}>
                {displayMonth} 
                {displayDay} 
                {displayConditions} 
                <img src={displayIconUrl} width="32" height="32" />
              </div>
            )
          }
        })
      }
      </div>
    </div>
  );

  ReactDOM.render(template, appRoot);
};
