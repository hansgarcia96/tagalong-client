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
    axios.get(`http://localhost:5000/api/events`)
    .then(responseFromApi => {
      this.setState({
        listOfEvents: responseFromApi.data
      });
    });
  };

<<<<<<< HEAD

  render() {
    
=======
  render() {

>>>>>>> 599d2c19d41f5ab1964f25393acd5264b5100c1c
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
<<<<<<< HEAD
   
    
=======
>>>>>>> 599d2c19d41f5ab1964f25393acd5264b5100c1c
  }
}

export default EventList;
