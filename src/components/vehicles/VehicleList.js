import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddVehicle from "./AddVehicle";

class VehicleList extends Component {
  constructor() {
    super();
    this.state = { listOfVehicles: [] };
  }

  getAllVehicles = () => {
    axios.get(`http://localhost:5000/api/vehicles`).then(responseFromApi => {
      this.setState({
        listOfVehicles: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    this.getAllVehicles();
  }

  render() {
    return (
      <div>
        <div style={{ width: "40%", float: "right" }}>
          {this.state.listOfVehicles.map(vehicle => {
            return (
              <div key={vehicle._id}>
                <Link to={`/vehicles/${vehicle._id}`}>
                  <h3>{vehicle.model}</h3>
                </Link>
              </div>
            );
          })}
        </div>
        <div style={{ width: "40%", float: "right" }}>
          <AddVehicle getVehicle={this.getAllVehicles} />
        </div>
      </div>
    );
  }
}

export default VehicleList;
