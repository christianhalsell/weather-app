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
      weather: undefined
    }
  }

  getWeather(zipCode) {
    fetch(`https://api.apixu.com/v1/forecast.json?key=${apiKey}&q=${zipCode}&days=3`)
    .then((json) => json.json())
    .then((data) => this.setState({
      weather: data
    }))
    .then(() => {
      console.log('this.state', this.state);
    })
    .catch((err) => console.error(err.message))
  };

  render() {
    const title = 'Weather App';
    const subTitle = 'Weather app in React'
    const currentConditions = this.state.weather ? this.state.weather.current : false;
    const location = this.state.weather ? this.state.weather.location : false;
    const forecast = (this.state.weather && this.state.weather.forecast) ? this.state.weather.forecast.forecastday : false;

    return (
      <div>
        <Header title={title} subtitle={subTitle} />
        <InputForm getWeather={this.getWeather} />
        { forecast && <Forecast currentConditions={currentConditions} location={location} forecast={forecast} /> }
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
              // month={day.date.monthname} 
              day={day.date} 
              conditions={day.day.condition.text} 
              imgsrc={day.day.condition.icon} 
            />
          )
        })
      }
    </div>      
  );
}

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
