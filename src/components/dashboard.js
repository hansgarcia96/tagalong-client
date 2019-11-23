import React, { Component } from "react";
import UserEvents from "./events/UserEvents";
import Concerts from "./concerts/concert";
import EventCountdown from "./events/EventCountdown";

import Countdown from "./events/test";
import axios from "axios";
import { throws } from "assert";
import BodyClassName from 'react-body-classname';
import './css-folder/fullDashboard.css';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLat: "",
      userLng: "",
      listOfEvents: [],
      nextEventObj: "",
      nextEventDate: ""
    };
  }

  componentDidMount() {
    this.getAllEvents();
  }

  getCurrentPosition = () => {
    const geolocation = navigator.geolocation;

    geolocation.getCurrentPosition(
      position => {
        // console.log(`user lat: ${position.coords.latitude}`);
        // console.log(`user lng: ${position.coords.longitude}`);
        this.setState(
          {
            userLat: position.coords.latitude,
            userLng: position.coords.longitude
          },
          () => {
            // console.log(this.state)
          }
        );
      },
      () => {
        console.log(new Error("Permission denied"));
      }
    );

    // console.log(this.state)
  };

  getAllEvents = () => {
    console.log("getAllEvents() working");
    axios.get(`http://localhost:5000/api/events`).then(responseFromApi => {
      this.setState({
        listOfEvents: responseFromApi.data
      });
    });
  };



  getNextEvent = () => {

    let copyOfEvents = this.state.listOfEvents;
    console.log("FROM DASBOARD getNextEvent => copyOfEvents: ", copyOfEvents);

    copyOfEvents = copyOfEvents.sort((a, b) =>
      parseFloat(a.startDate) > parseFloat(b.startDate) ? 1 : -1
    );

    let nextEvent = copyOfEvents[0];
 
    console.log("FROM DASHBOARD getNextEvent => nextEvent is: ", nextEvent);
    console.log(`FROM DASHBOARD getNextEvent => the getNext event date is: `, nextEvent.startDate);

    return nextEvent;
  };



/*   getNextEventObject = () => {


    console.log("FROM DASHBOARD getNextEventObject +++> nextEvent is:" , nextEvent)

    let nextEventObject = nextEvent;
    console.log("FROM DASHBOARD getNextEventObject +++> nextEventObject is: ", nextEventObject);

    return nextEventObject;
  }; */



/*   displayEventInfo = () => {
    console.log("hello from displayEventInfo")
    let theContainer = document.getElementById('carContainer');
    let theDiv = document.createElement('div');
    theDiv.textContent = 'Hello'
    console.log(theContainer)
    if(this.state.listOfEvents.length > 0){
     
      theContainer.innerHTML += `<h2>EventName</h2>`

    }else{
    return <div>NO SEATS AVAILABLE</div>
    }
  } */



  render() {
    this.getCurrentPosition()
    if (this.props.currentUser) {
      return (
        <div className='myEvents'>
          <div className="myTest">
            <BodyClassName className="theedashboard"></BodyClassName>
            <UserEvents myUser={this.props.currentUser} />
          </div>
          <div>
            {/* <EventCountdown /> */}
            {/* {<Countdown date={`${year}-12-24T00:00:00`} />} */}
            <div id="carContainer">
              {this.state.listOfEvents > 0 && this.displayEventInfo()}
            </div>
            {this.state.listOfEvents.length > 0 ? (
              <Countdown
                date={this.getNextEvent()}
              />
            ) : (
              <div>Not Working</div>
            )}
          </div>
          {this.state.userLat !== "" ? (
            <Concerts getUserCoords={this.state} />
          ) : (
            <div>Not Working</div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          DASHBOARD
          <div>
            <UserEvents />
          </div>
          <div>
            <EventCountdown />
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
