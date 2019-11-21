import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import AutoComplete from "../google/autoComplete";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", lat: "", lng: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const lat = this.state.lat;
    const lng = this.state.lng;

    this.service
      .signup(username, password, lat, lng)
      .then(response => {
        this.setState({
          username: "",
          password: "",
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

          <input type="submit" value="Signup" />
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
