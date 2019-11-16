import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // REDIRECT
import EditEvent from "./EditEvent";

/* import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps' */
import TheMap from "../google/maps";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { theEvent: {} };
  }

  componentDidMount() {
    this.getSingleEvent();
  }

  getSingleEvent = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/events/${params.id}`)
      .then(responseFromApi => {
        const theEvent = responseFromApi.data;
        console.log(`the event lat: ${theEvent.lat}`)
        console.log(`the event lng: ${theEvent.lng}`)
        this.setState(theEvent);
      })
      .catch(err => {
        console.log(err);
      });
  };


  renderEditForm = () => {
    if (!this.state.eventName) {
      this.getSingleEvent();
    } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
      return (
        <EditEvent
          theEvent={this.state}
          getTheEvent={this.getSingleEvent}
          {...this.props}
        />
      );
    }
  };

  // DELETE EVENT:
  deleteEvent = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/events/${params.id}`)
      .then(() => {
        this.props.history.push("/events"); // !!!
      })
      .catch(err => {
        console.log(err);
      });
  };

  ownershipCheck = event => {
    if (
      this.props.loggedInUser &&
      event.owner === this.props.loggedInUser._id
    ) {
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteEvent(this.state._id)}>
            Delete Event
          </button>
        </div>
      );
    }
  };

  renderEditForm = () => {
    if (!this.state.eventName) {
      this.getSingleEvent();
    } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
      return (
        <EditEvent
          theEvent={this.state}
          getTheEvent={this.getSingleEvent}
          {...this.props}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.eventName}</h1>
        <p>{this.state.description}</p>
        <p>{this.state.category}</p>
        <p>{this.state.location}</p>
        <p>{this.state.lat}</p>
        <p>{this.state.lng}</p>
        <TheMap theEvent={this.state}/>
        <h1>Hello WOrld!!!!</h1>
{/*         <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteEvent()}>Delete Event</button>
        <br />
        <div>{this.ownershipCheck(this.state)}</div> */}
        <Link to={"/events"}>Back to Events</Link>
      </div>
    );
  }
}

export default EventDetails;
