import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import history from "../../history";
import service from "../../api/service";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      imageUrl: ""
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

    this.service
      .signup(username, password, firstName, lastName, imageUrl)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          imageUrl: ""
        });
        this.props.getUser(response);
        history.push("/dashboard");
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="Username Here!"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          <br />

          <input
            type="password"
            placeholder="Secret Password"
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

        <p>
          Already have account?
          <br />
          <Link to={"/login"}>Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
