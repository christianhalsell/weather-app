import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import Key from './weatherAPIKey';

// THIS IS FOR OFF-LINE TESTING
import * as data from './weather.json'; // just for testing

// let data;
// const apiKey = Key;

// fetch(`http://api.wunderground.com/api/${apiKey}/forecast/q/CA/Irvine.json`)
//   .then((response) => response.json())
//   .then((json) => json)
//   .then((result) => data = result) // assign result to global variable
//   .then((weather) => console.log(weather)) // show the full api response in console
//   .then(() => render()) // render component
//   .catch((err) => console.error(`Error: ${err.message}`));

class WeatherApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <InputForm />
        <Forecast />        
      </div>
    )
  }
};

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Weather</h1>
        <p>Weather project</p>
      </div>
    )
  }
};

class InputForm extends React.Component {
  render() {
    return (
      <div>
        <h3>Input form</h3>
      </div>
    )
  }
};

class Forecast extends React.Component {
  render() {
    return (
      <div>
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
    );
  }
};

ReactDOM.render(<WeatherApp />, document.getElementById('app'));
