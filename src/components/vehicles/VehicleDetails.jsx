import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditVehicle from "./EditVehicle";

class VehicleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { theVehicle: {} };
  }

  componentDidMount() {
    this.getSingleVehicle();
  }

  getSingleVehicle = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/vehicles/${params.id}`)
      .then(responseFromApi => {
        const theVehicle = responseFromApi.data;
        this.setState(theVehicle);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.model) {
      this.getSingleVehicle();
    } else {
      return (
        <EditVehicle
          theVehicle={this.state}
          getSingleVehicle={this.getSingleVehicle}
          {...this.props}
        />
      );
    }
  };

  deleteVehicle = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/vehicles/${params.id}`)
      .then(() => {
        this.props.history.push("/vehicles");
      })
      .catch(err => {
        console.log(err);
      });
  };

  ownershipCheck = event => {
    if (
      this.props.loggedInUser &&
      event.owner === this.props.loggedInUser._id
    ) {
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteVehicle(this.state._id)}>
            Delete Vehicle
          </button>
        </div>
      );
    }
  };

  renderEditForm = () => {
    if (!this.state.model) {
      this.getSingleVehicle();
    } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
      return (
        <EditVehicle
          theVehicle={this.state}
          getTheVehicle={this.getSingleVehicle}
          {...this.props}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.model}</h1>
        <p>{this.state.seats}</p>
        <button onClick={() => this.deleteVehicle()}>Delete Vehicle</button>
        <img src={this.state.imageUrl} alt="boohoo" height="300" />
        <Link to={"/vehicles"}>Back to Vehicle</Link>
      </div>
    );
  }
}

export default VehicleDetails;
