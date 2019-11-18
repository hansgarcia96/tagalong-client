import React, { Component } from "react";
import axios from "axios";
import service from "../../api/service";
import AutoComplete from "../google/autoComplete";

// ADD EVENT

class AddShenanigan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      description: "",
      category: "",
      location: "",
      lng: "",
      lat: "",
      date: "",
      imageUrl: ""
    };
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
          date: "",
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
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <input type="file" onChange={e => this.handleFileUpload(e)} />
          <br />
          <button type="submit">Submit</button>
        </form>

        {<AutoComplete getCoord={coordObj => this.setCoord(coordObj)} />}
      </div>
    );
  }
}

export default AddShenanigan;
