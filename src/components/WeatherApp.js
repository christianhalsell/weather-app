import React from 'react';
import Header from './Header';
import Forecast from './Forecast';
import InputModal from './InputModal';

import { apixuKey } from '../weatherAPIKey';

export default class WeatherApp extends React.Component {
  state = {
    weather: undefined,
    inputModal: undefined
  };

  getWeather = (zipCode) => {
    fetch(`https://api.apixu.com/v1/forecast.json?key=${apixuKey}&q=${zipCode}&days=7`)
    .then((json) => json.json())
    .then((data) => this.setState({
      weather: data,
      inputModal: undefined
    }))
    .then(() => {
      console.log('this.state', this.state);
      this.weatherBackground();
    })
    .catch((err) => console.error(err.message))
  };

  weatherBackground = () => {
    const weatherApp = document.querySelector('#weatherApp');
    const weatherClass = this.state.weather.current.condition.text || '';

    weatherApp.classList = 'weather-app';
    weatherApp.classList.add(weatherClass.split(' ').join('-').toLowerCase());
  }

  openInputModal = () => {
    this.setState(() => ({
      inputModal: true
    }));
  };

  closeInputModal = () => {
    this.setState(() => ({
      inputModal: undefined
    }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('location');
      const storedZip = JSON.parse(json);

      if (storedZip) {
        this.getWeather(storedZip);
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  render() {
    const currentConditions = this.state.weather ? this.state.weather.current : false;
    const location = this.state.weather ? this.state.weather.location : undefined;
    const forecast = (this.state.weather && this.state.weather.forecast) ? this.state.weather.forecast.forecastday : false;
    const error = (this.state.weather && this.state.weather.error) ? this.state.weather.error.message : false;
    
    return (
      <div id="weatherApp" className="weather-app">
        <Header location={location} openInputModal={this.openInputModal} getWeather={this.getWeather} />
        { error && <div>{error}</div> }
        { forecast && <Forecast currentConditions={currentConditions} forecast={forecast} /> }
        <InputModal
          inputModal={this.state.inputModal}
          closeInputModal={this.closeInputModal}
          getWeather={this.getWeather}
        />
      </div>
    )
  }
};