import React, { Component } from "react";
import axios from "axios";

class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = { vehicleType: "", model: "", year: "", seats: 0 };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const vehicleType = this.state.vehicleType;
    const model = this.state.model;
    const year = this.state.year;
    const seats = this.state.seats;

    axios
      .post(
        "http://localhost:5000/api/vehicles",
        { vehicleType, model, year, seats },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getVehicle();
        this.setState({
          vehicleType: "",
          model: "",
          year: "",
          seats: 0,
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Vehicle</label>
          <input
            type="text"
            name="vehicleType"
            value={this.state.vehicleType}
            onChange={e => this.handleChange(e)}
          />
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={this.state.model}
            onChange={e => this.handleChange(e)}
          />
          <label>Year</label>
          <input
            type="text"
            name="year"
            value={this.state.year}
            onChange={e => this.handleChange(e)}
          />
          <label>Seats</label>
          <input
            type="number"
            name="seats"
            value={this.state.seats}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddVehicle;
