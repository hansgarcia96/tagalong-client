import React, { Component } from "react";
import UserEvents from "./events/UserEvents";

// DASHBOARD

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
          <div className='myTest'>
            <UserEvents myUser={this.props.currentUser}/>
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

// NEW FUNCTIONAL DASH
// import React from "react";

// const Header = () => {
//   return (
//     <header>
//       <h1>DASHBOARD</h1>
//     </header>
//   );
// };

// export default Header;
