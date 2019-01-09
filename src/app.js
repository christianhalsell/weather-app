// TODO: fix alerts for node_modules
// TODO: install moment for dates
// TODO: add wind direction and speed in current

import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './components/WeatherApp';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<WeatherApp />, document.getElementById('app'));
