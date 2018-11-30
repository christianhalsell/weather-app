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
    const title = 'Weather App';
    const subTitle = 'Weather app in React'

    return (
      <div>
        <Header title={title} subtitle={subTitle} />
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
        <h1>{this.props.title}</h1>
        <p>{this.props.subtitle}</p>
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
            return (
              <ForecastDay 
                key={day.date.day} 
                month={day.date.monthname} 
                day={day.date.day} 
                conditions={day.conditions} 
                imgsrc={day.icon_url} 
              />
            )
          })
        }
      </div>      
    );
  }
};

class ForecastDay extends React.Component {
  render() {
    return (
      <div>
        {this.props.month} 
        {this.props.day} 
        {this.props.conditions} 
        <img src={this.props.imgsrc} width="32" height="32" />
      </div>
    )
  }
}

ReactDOM.render(<WeatherApp />, document.getElementById('app'));
