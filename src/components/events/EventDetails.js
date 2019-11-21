import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // REDIRECT
import EditEvent from "./EditEvent";

/* import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps' */
import TheMap from "../google/maps";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { theEvent: null };
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
        console.log(theEvent)
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
    if(this.state !== null){
      return (
        <div>
          <h1>{this.state.eventName}</h1>
          <p>{this.state.description}</p>
          <p>{this.state.category}</p>
          {this.state.author && <p>{this.state.author.firstName} {this.state.author.lastName}</p> }

          <p>Start Date: {this.state.startDate}</p>
          <p>End Date: {this.state.endDate}</p>
          <h3>{this.state.transportation}</h3>
          <p>{this.state.lat}</p>
          <p>{this.state.lng}</p>
          <img src={this.state.imageUrl} alt="boohoo" height="300" />
          <TheMap theEvent={this.state}/>
          <div><h1>Vehicle Component belongs here</h1></div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteEvent()}>Delete Event</button>
          <br />
          <div>{this.ownershipCheck(this.state)}</div>
          <Link to={"/events"}>Back to Events</Link>
        </div>
      );
    } else {
      return (
        <div>
         Loading
        </div>
      );
    }

  }
}

export default EventDetails;
