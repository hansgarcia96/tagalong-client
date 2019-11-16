import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/auth-service";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getTheUser(null);
    });
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        
        <nav className="nav-style">
          <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li>
              <Link to="/events" style={{ textDecoration: "none" }}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/vehicles" style={{ textDecoration: "none" }}>
                Vehicles
              </Link>
            </li>
{/* 
            <li>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </li> */}
           

            <li>
              <Link to="/">
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="nav-style">
          <ul>
            <li>
            <Link to='/'></Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </li>
            <li>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default Navbar;
