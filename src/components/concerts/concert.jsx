import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Concerts extends Component {
  constructor(props) {
    super(props);
    this.state = { listofConcerts: [] }
  }

  getAllConcertsFromMiami = () => {
    axios.get(`https://api.songkick.com/api/3.0/metro_areas/9776/calendar.json?apikey=wXhfjuiigBr1Hnnx`)
    .then(responseFromApi => {

      // the list of concerts in Miami-id# 9776
      console.log(responseFromApi.data.resultsPage.results.event)
      const apiConcertList = responseFromApi.data.resultsPage.results.event;

      this.setState({
        listofConcerts: apiConcertList
      })
    })
  }

  showConcerts = () => {
    return this.state.listofConcerts.map((eachConcert) => {
      return (
        <div key={eachConcert.id}>
          <Jumbotron>
            <Container>
              <h1>{eachConcert.displayName}</h1>
              <br></br>
              <p> Set Countdown {eachConcert.start.time}</p>
              <p>{eachConcert.uri}</p>
              <p>
                <Button variant="primary">Create Event</Button>
              </p>
            </Container>
          </Jumbotron>
        </div>
      )
    })
  }


  componentDidMount() {
    this.getAllConcertsFromMiami();
  }


  render() { 
    return ( 
      <div>
        <div>
          <h1>Concerts in Miami!</h1>
          {this.showConcerts()}
        </div>
      </div>
     );
  }
}
 
export default Concerts;