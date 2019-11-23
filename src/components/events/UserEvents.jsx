import React, { Component } from "react";
import axios from "axios";

let filterEvents = [];
class UserEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { userEvents: [], myId: "" };
  }

  componentDidMount() {
    this.setState(
      {
        myId: this.props.myUser._id
      },
      () => {
        axios
          .get(`http://localhost:5000/api/events`)
          .then(responseFromApi => {
            this.setState({
              userEvents: responseFromApi.data
            });
          })
          .catch(err => console.log(err));
      }
    );
  }

  myUserEvents = myId => {
    if (this.state.userEvents.length) {
      let theArray = this.state.userEvents;
      filterEvents = theArray.filter(eachEvent => {

        return eachEvent.author === myId;
      });
    }
    // console.log(filterEvents);
    return filterEvents.map(eachEvent => {
      return (
        <div key={eachEvent._id}>
          <img src={eachEvent.imageUrl} alt="boohoo" height="300" />
          <h3>{eachEvent.eventName}</h3>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h1>My Events:</h1>
        {this.myUserEvents(this.state.myId)}
      </div>
    );
  }
}

export default UserEvents;
