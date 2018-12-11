import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import Key from './weatherAPIKey';
const apiKey = Key;

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);

    this.getWeather = this.getWeather.bind(this);

    this.state = {
      current: undefined,
      forecast: undefined
    }
  }

  getWeather(zipCode) {
    Promise.all([
      fetch(`http://api.wunderground.com/api/${apiKey}/conditions/q/${zipCode}.json`),
      fetch(`http://api.wunderground.com/api/${apiKey}/forecast/q/${zipCode}.json`)
    ])
    .then(([json1, json2]) => Promise.all([json1.json(), json2.json()]))
    .then(([data1, data2]) => this.setState({
      current: data1,
      forecast: data2
    }))
    .catch((err) => console.error(err.message))
  };

  render() {
    const title = 'Weather App';
    const subTitle = 'Weather app in React'
    const currentConditions = this.state.current ? this.state.current.current_observation : false;
    const forecast = (this.state.forecast && this.state.forecast.forecast) ? this.state.forecast.forecast.simpleforecast.forecastday : false;

    return (
      <div>
        <Header title={title} subtitle={subTitle} />
        <InputForm getWeather={this.getWeather} />
        { forecast && <Forecast currentConditions={currentConditions} forecast={forecast} /> }
      </div>
    )
  }
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </div>
  );
};

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.findLocation = this.findLocation.bind(this);
  }

  findLocation(e) {
    e.preventDefault();

    const zipCode = e.target.elements.location.value.trim();
    this.props.getWeather(zipCode);
    e.target.elements.location.value = '';
  };

  render() {
    return (
      <div>
        <form onSubmit={this.findLocation}>
          <input type="text" name="location" placeholder="Enter your zipcode" />
          <button>Submit</button>
        </form>
      </div>
    )
  }
};

// const Forecast ???

class Forecast extends React.Component {
  render() {
    console.log('this.props', this.props);
    return (
      <div>
        <p>Forecast for {this.props.currentConditions.display_location.full}</p>
        {
          <CurrentConditions
            currentTemperature={this.props.currentConditions.temp_f}
            currentIconSrc={this.props.currentConditions.icon_url}
            currentWeather={this.props.currentConditions.weather}
          />
        }
        {
          this.props.forecast.map((day) => {
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

const CurrentConditions = (props) => {
  return (
    <div>
      <h2>{props.currentTemperature}&deg; F</h2>
      <p>{props.currentWeather} <img src={props.currentIconSrc} /></p>        
    </div>
  );
};

const ForecastDay = (props) => {
  return (
    <div>
      {props.month} {props.day} {props.conditions} <img src={props.imgsrc} width="32" height="32" />
    </div>
  );
};

ReactDOM.render(<WeatherApp />, document.getElementById('app'));
