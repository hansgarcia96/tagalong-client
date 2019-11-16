import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import history from "../../history";

class Signup extends Component {
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
      .signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: ""
        });
        this.props.getUser(response);
        history.push("/dashboard");
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
          <br />

          <input
            type="password"
            placeholder="Secret Password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />

          <br />
          
          <input type="submit" value="Signup! What are you waiting for?" />
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
