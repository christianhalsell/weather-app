import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import Key from './weatherAPIKey';

// THIS IS FOR OFF-LINE TESTING
import * as data from './weather.json'; // just for testing

const apiKey = Key;

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: data
    }

    setTimeout(() => { // used for testing default state
      fetch(`http://api.wunderground.com/api/${apiKey}/forecast/q/CA/Irvine.json`)
        .then((response) => response.json())
        .then((result) => {
          this.setState(() => {
            return {
              weather: result
            }
          });
        })
        .catch((err) => console.error(`Error: ${err.message}`)
      );
    }, 2000);
  }

  render() {
    const title = 'Weather App';
    const subTitle = 'Weather app in React'
    const currentCondition = this.state.weather.forecast.simpleforecast.forecastday;

    console.log(this.state.weather);
    console.log(this.state.weather.forecast.simpleforecast.forecastday[0].conditions);

    return (
      <div>
        <Header title={title} subtitle={subTitle} />
        <InputForm />
        <Forecast conditions={currentCondition} />
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
  findLocation(e) {
    e.preventDefault();
    
    console.log('%c Submitted...', 'background-color: cyan; padding: 2px 10px')
  };

  render() {
    return (
      <div>
        <form>
          <input type="text" name="location" />
          <button onClick={this.findLocation}>Submit</button>
        </form>
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
          this.props.conditions && this.props.conditions.map((day) => {
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
