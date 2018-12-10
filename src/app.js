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
      forecast: undefined,
      zipCode: undefined
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
      forecast: data2,
      zipCode
    }))
    // .then(() => console.log(this.state.current.current_observation))
    .catch((err) => console.error(err.message))
  };

  render() {
    const title = 'Weather App';
    const subTitle = 'Weather app in React'
    const currentConditions = this.state.current ? this.state.current.current_observation : false;
    const forecast = this.state.forecast ? this.state.forecast.forecast.simpleforecast.forecastday : false;

    return (
      <div>
        <Header title={title} subtitle={subTitle} />
        <InputForm getWeather={this.getWeather} />
        { forecast && <Forecast currentConditions={currentConditions} forecast={forecast} zipCode={this.state.zipCode} />}
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

class Forecast extends React.Component {
  render() {
    console.log('this.props', this.props);
    return (
      <div>
        <p>Forecast for {this.props.currentConditions.display_location.full}, {this.props.zipCode}</p>
        {
          <CurrentConditions
            currentTemperature={this.props.currentConditions.temp_f}
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

class CurrentConditions extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.currentTemperature}&deg; F</h2>
      </div>
    )
  }
}

class ForecastDay extends React.Component {
  render() {
    return (
      <div>
        {this.props.month} {this.props.day} {this.props.conditions} <img src={this.props.imgsrc} width="32" height="32" />
      </div>
    )
  }
}

ReactDOM.render(<WeatherApp />, document.getElementById('app'));
