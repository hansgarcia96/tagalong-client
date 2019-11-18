import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import history from "../../history";
import service from "../../api/service";
import AutoComplete from "../google/autoComplete";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      imageUrl: "",
      lat: "", lng: "" 
    };
    this.service = new AuthService();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

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
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const imageUrl = this.state.imageUrl;
    const lat = this.state.lat;
    const lng = this.state.lng;

    this.service
      .signup(username, password, firstName, lastName, imageUrl, lat, lng)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          imageUrl: "",
          lat: "",
          lng: ""
        });
        this.props.getUser(response);
      })
      .catch(error => console.log(error));
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  setCoord = coordObj => {
    console.log("coord in parent signup: ", coordObj);
    this.setState(
      {
        lng: coordObj.lng,
        lat: coordObj.lat
      },
      () => console.log("state in singup", this.state)
    );
  };
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />

          <label>Password:</label>
          <textarea
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <input type="file" onChange={e => this.handleFileUpload(e)} />
          <br />
          <button type="submit">Submit</button>
        </form>

        {<AutoComplete getCoord={coordObj => this.setCoord(coordObj)} />}

        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
