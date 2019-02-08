import React from 'react';

export default class InputForm extends React.Component {
  findLocation= (e) => {
    e.preventDefault();

    const location = e.target.elements.location.value.trim();

    const json = JSON.stringify(location);
    localStorage.setItem('location', json);

    this.props.getWeather(location);
    e.target.elements.location.value = '';
  };

  render() {
    return (
      <div>
        <form onSubmit={this.findLocation}>
          <input className="input" type="text" name="location" placeholder="city or zipcode" />
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
};