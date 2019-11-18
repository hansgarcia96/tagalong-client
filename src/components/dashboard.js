import React, { Component } from "react";
import UserEvents from "./events/UserEvents";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.currentUser) {
      return (
        <div>
          DASHBOARD
          <div className="myTest">
            <UserEvents myUser={this.props.currentUser} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          DASHBOARD
          <div>
            <UserEvents />
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
