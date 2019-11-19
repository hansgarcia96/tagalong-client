import React, { Component } from "react";
import UserEvents from "./events/UserEvents";
import Concerts from "./concerts/concert";




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { userLat: "", userLng: ""};
  }

  getCurrentPosition = () => {
    const geolocation = navigator.geolocation;

    geolocation.getCurrentPosition(
      position => {
        // console.log(`user lat: ${position.coords.latitude}`);
        // console.log(`user lng: ${position.coords.longitude}`);
        this.setState({
          userLat: position.coords.latitude,
          userLng: position.coords.longitude
        }, () => {
          // console.log(this.state)
        });
      },
      () => {
        console.log(new Error("Permission denied"));
      }
    );

    // console.log(this.state)
  };



  render() { 

    this.getCurrentPosition()
    // console.log(this.state);
   
    if (this.props.currentUser) {
      return (
        <div>

          DASHBOARD

          <div className='myTest'>
            <UserEvents myUser={this.props.currentUser}/>
          </div>
        
          {this.state.userLat !== '' ? <Concerts getUserCoords={this.state}/> : <div>Not Working</div>}

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


