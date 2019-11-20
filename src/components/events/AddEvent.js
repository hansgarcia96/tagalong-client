import React, { Component } from "react";
import axios from "axios";
import service from "../../api/service";
import AutoComplete from "../google/autoComplete";

// import VehicleList from "../vehicles/VehicleList";

import SimpleVehicleList from "../vehicles/SimpleVehicleList";

// ADD EVENT

class AddShenanigan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      description: "",
      category: "",
      lng: "",
      lat: "",
      startDate: "",
      endDate: "",
      imageUrl: "",
      showingVehicleList: false,
      listOfVehicles: []
      // displayNumberOfVehicles: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/vehicles/")
      .then(response => response.json())
      .then(data => {
        this.setState({ listOfVehicles: data });
        console.log(this.state.listOfVehicles);
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then(response => {
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/events", this.state, {
        withCredentials: true
      })
      .then(() => {
        this.props.getEvent();
        this.setState({
          eventName: "",
          description: "",
          category: "",
          location: "",
          lng: "",
          lat: "",
          startDate: "",
          endDate: "",
          imageUrl: ""
        });
      })
      .catch(error => console.log(error));
  };

  setCoord = coordObj => {
    console.log("coord in parent: ", coordObj);
    this.setState(
      {
        lng: coordObj.lng,
        lat: coordObj.lat
      },
      () => console.log("state in add event", this.state)
    );
  };

  showAddVehicleFuntion = () => {
    console.log("button clicked");
    this.setState({ showingVehicleList: true });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Event</label>
          <input
            type="text"
            name="eventName"
            placeholder="Your Event's Name"
            value={this.state.eventName}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={this.state.category}
            onChange={e => this.handleChange(e)}
          />
          <br />
          {<AutoComplete getCoord={coordObj => this.setCoord(coordObj)} />}
          <br />
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={this.state.startDate}
            onChange={e => this.handleChange(e)}
          />
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={this.state.endDate}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <input type="file" onChange={e => this.handleFileUpload(e)} />
          <br />

          <form>
            <select name="vehicle">
              {this.state.listOfVehicles.map(eachVehicle => (
                <option key={eachVehicle._id}>{eachVehicle.model}</option>
              ))}
            </select>
          </form>

          <button type="submit" onChange={e => this.handleChange(e)}>
            Submit
          </button>
          <br />
          </form>
      </div>
      
    );
  }
}

// OLD CODE
    {/* <button
            onClick={this.showAddVehicleFuntion}
            onChange={e => this.handleChange(e)}
          >
            Add Vehicles to event
          </button> */}
     
        {/* {this.state.showingVehicleList && (
          <div>
            <h1>Vehicle List</h1>
            <SimpleVehicleList />
          </div>
        )} */}


export default AddShenanigan;
