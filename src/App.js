import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";


// USER
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/auth-service";

// NAV
import Navbar from "./components/navbar/Navbar";

// LANDING
import Landing from "./components/landing";

// DASHBOARD
import Dashboard from "./components/dashboard";

// EVENT
import EventList from "./components/events/EventList";
import EventDetails from "./components/events/EventDetails";

// CONCERT
import Concerts from "./components/concerts/concert";

// VEHICLE
import VehicleList from "./components/vehicles/VehicleList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  render() {
    console.log(this.state);
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar
            userInSession={this.state.loggedInUser}
            getTheUser={this.getTheUser}
          />

          <Switch>
            {/* <Route exact path="/landing" component={Landing} /> */}
            <Route exact path="/events" component={EventList} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/vehicles" component={VehicleList} />
            <Route exact path="/concerts" component={Concerts} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
       

          <Switch>

            <Route
              exact
              path="/"
              component={Landing} />}
            />

            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getTheUser} />}
            />

            <Route
              exact
              path="/login"
              render={() => <Login getUser={this.getTheUser} />}
            />

            <Route exact path="/events" component={EventList} />
            <Route exact path="/events/:id" component={EventDetails} />
          </Switch>
        </div>
      );
    }
  }
}
export default App;
