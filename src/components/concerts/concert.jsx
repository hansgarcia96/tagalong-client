import React, { Component } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Concerts extends Component {
  constructor(props) {
    super(props);
    this.state = { listofConcerts: [], userLocation: '' }
  }
  
  findMetroId = () => {
    const userLat = this.props.getUserCoords.userLat;
    const userLng = this.props.getUserCoords.userLng;

    console.log(`The user location: lat ${userLat}, lng: ${userLng}`)

    axios.get(`https://api.songkick.com/api/3.0/search/locations.json?location=geo:${userLat},${userLng}&apikey=wXhfjuiigBr1Hnnx`)
    .then(responseFromApi => {
    
      const metroId = responseFromApi.data.resultsPage.results.location[0].metroArea.id;
      console.log(metroId);
      //return metroId;
      return this.findConcertsNearby(metroId);
    })
  }

  findConcertsNearby = (stuff) => {
  

    const test = stuff;
    console.log(test);
    console.log('from MIami',test);
    //console.log("from findConcertsNearby:", this.state)

    //const userLat = this.props.getUserCoords.userLat;
    //const userLng = this.props.getUserCoords.userLng;

    //console.log(`The user location: lat ${userLat}, lng: ${userLng}`)

    axios.get(`https://api.songkick.com/api/3.0/metro_areas/${test}/calendar.json?apikey=wXhfjuiigBr1Hnnx`)
    .then(responseFromApi => {

      // the list of concerts in Miami-id# 9776
      // console.log(responseFromApi.data.resultsPage.results.event)
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
    this.setState({userLocation: this.props});
    this.findMetroId();
    //this.findConcertsNearby()
  }


  render() { 
    console.log(this.state)
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