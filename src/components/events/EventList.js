import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddEvent from "./AddEvent";

class EventList extends Component {
  constructor() {
    super();
    this.state = { listOfEvents: [] };
  }

  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents = () => {
    console.log("IM MOVING");
    axios.get(`http://localhost:5000/api/events`)
    .then(responseFromApi => {
      this.setState({
        listOfEvents: responseFromApi.data
      });
    });
  };


  render() {
    if(this.state.listOfEvents.length){
      return (
        <div>
          <div style={{ width: "60%", float: "left" }}>
            {this.state.listOfEvents.map(event => {
              return (
                <div key={event._id}>
                  <Link to={`/events/${event._id}`}>
                    <h3>{event.eventName}</h3>
                  </Link>
                </div>
              );
            })}
          </div>
          <div style={{ width: "40%", float: "right" }}>
            <AddEvent getEvent={this.getAllEvents} />
          </div>
        </div>
      );
    }else{
      return<div>CONO</div>
    }
    
  }
}

export default EventList;
