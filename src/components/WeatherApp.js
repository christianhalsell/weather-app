import React from 'react';
import Header from './Header';
import Forecast from './Forecast';
import InputForm from './InputForm';
import InputModal from './InputModal';

import Key from '../weatherAPIKey';
const apiKey = Key;

export default class WeatherApp extends React.Component {
  state = {
    weather: undefined,
    inputModal: undefined
  }

  getWeather = (zipCode) => {
    fetch(`https://api.apixu.com/v1/forecast.json?key=${apiKey}&q=${zipCode}&days=3`)
    .then((json) => json.json())
    .then((data) => this.setState({
      weather: data,
      inputModal: undefined
    }))
    .then(() => {
      console.log('this.state', this.state);
    })
    .catch((err) => console.error(err.message))
  };

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
    const title = 'Weather App';
    const subTitle = 'Weather app in React'
    const currentConditions = this.state.weather ? this.state.weather.current : false;
    const location = this.state.weather ? this.state.weather.location : false;
    const forecast = (this.state.weather && this.state.weather.forecast) ? this.state.weather.forecast.forecastday : false;
    const error = (this.state.weather && this.state.weather.error) ? this.state.weather.error.message : false;
    
    return (
      <div>
        <Header title={title} subtitle={subTitle} openInputModal={this.openInputModal} />
        <InputForm getWeather={this.getWeather} />        
        { error && <p>{error}</p> }
        { forecast && <Forecast currentConditions={currentConditions} location={location} forecast={forecast} /> }
        <InputModal
          inputModal={this.state.inputModal}
          closeInputModal={this.closeInputModal}
          getWeather={this.getWeather}
        />
      </div>
    )
  }
};