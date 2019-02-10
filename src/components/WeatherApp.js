import React from 'react';
import Header from './Header';
import Forecast from './Forecast';
import InputModal from './InputModal';

const apixuKey = '5d72fda7890c48a78b9184717182812'; // Need to put in backend in prod

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
      } else {
        this.openInputModal();
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  render() {
    const { weather } = this.state;
    const currentConditions = weather ? weather.current : false;
    const location = weather ? weather.location : undefined;
    const forecast = (weather && weather.forecast) ? weather.forecast.forecastday : false;
    const error = (weather && weather.error) ? weather.error.message : false;

    const weatherProps = {
      error,
      location,
      openInputModal: this.openInputModal,
      getWeather: this.getWeather
    }

    const forecastProps = {
      currentConditions,
      forecast
    }

    const inputModalProps = {
      inputModal: this.state.inputModal,
      closeInputModal: this.clseInputModal,
      getWeather: this.getWeather
    }
    
    return (
      <div id="weatherApp" className="weather-app">
        <Header {...weatherProps} />
        { forecast && <Forecast {...forecastProps} /> }
        <InputModal {...inputModalProps} />
      </div>
    )
  }
};