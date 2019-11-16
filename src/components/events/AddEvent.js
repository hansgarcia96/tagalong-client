import React, { Component } from "react";
import axios from "axios";

import AutoComplete from "../google/autoComplete";

class AddShenanigan extends Component {
  constructor(props) {
    super(props);
    this.state = { eventName: "", description: "", category: "", location: "", lng:"", lat:"" }; // MISSING date: "", image: ""
  }

  handleFormSubmit = event => {

    event.preventDefault();
    const { eventName, description, category, location, lat, lng } = this.state;
    // const eventName = this.state.eventName;
    // const description = this.state.description;
    // const category = this.state.category;
    // const location = this.state.location;

    axios
      .post(
        "http://localhost:5000/api/events",
         this.state,
        { withCredentials: true }
      )
      .then(() => {
        this.props.getEvent();
        this.setState({
          eventName: "",
          description: "",
          category: "",
          location: "",
          lng:"",
          lat:""
        });
      })
      .catch(error => console.log(error));
  };

  setCoord = coordObj => {
    console.log("coord in parent: ", coordObj)
    this.setState({
      lng: coordObj.lng,
      lat: coordObj.lat
    }, () => console.log("state in add event", this.state))
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={this.state.category}
            onChange={e => this.handleChange(e)}
          />
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>

        {<AutoComplete getCoord={ coordObj => this.setCoord(coordObj) } />}

      </div>
    );
  }
}

export default AddShenanigan;
