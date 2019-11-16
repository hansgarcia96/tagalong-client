import React, { Component } from "react";
import axios from "axios";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: this.props.theEvent.eventName,
      description: this.props.theEvent.description,
      category: this.props.theEvent.category,
      location: this.props.theEvent.location
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const eventName = this.state.eventName;
    const description = this.state.description;
    const category = this.state.category;
    const location = this.state.location;

 

    axios
      .put(`http://localhost:5000/api/events/${this.props.theEvent._id}`, {
        eventName,
        description,
        category,
        location
      })
      .then(() => {
        this.props.getTheEvent();
        // after submitting the form, redirect to '/events'
        this.props.history.push("/events");
      })
      .catch(error => console.log(error));
  };

  handleChangeEventName = event => {
    this.setState({
      eventName: event.target.value
    });
  };

  handleChangeDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  handleChangeCategory = event => {
    this.setState({
      category: event.target.value
    });
  };

  handleChangeLocation = event => {
    this.setState({
      location: event.target.value
    });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={this.state.eventName}
            onChange={event => this.handleChangeEventName(event)}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={event => this.handleChangeDescription(event)}
          />

          <label>Category:</label>
          <textarea
            name="category"
            value={this.state.category}
            onChange={e => this.handleChangeCategory(e)}
          />

          <label>Location:</label>
          <textarea
            name="location"
            value={this.state.location}
            onChange={e => this.handleChangeLocation(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditEvent;
