import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service
      .login(username, password)
      .then(response => {
        console.log("WE LOGGED IN AND HERES THE USER ", response);
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
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
          <input
            type="text"
            placeholder="Username Here!"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />

          <input
            type="Text"
            name="password"
            placeholder="Secret Password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <input type="submit" value="Login Dude" />
        </form>
        <p>
          Don't have account?
          <br />
          <br />
          <Link to={"/signup"}>Signup!</Link>
        </p>
      </div>
    );
  }
}

export default Login;
