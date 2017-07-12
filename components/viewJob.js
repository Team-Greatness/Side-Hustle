import React, { Component } from 'react';
import { render } from 'react-dom'
import Job from './Job.js'
import mapController from '../controller/mapController.js';
import $ from 'jquery';
import GoogleMap from 'google-map-react';

var INITIAL_LOCATION = {
  address: 'London, United Kingdom',
  position: {
    latitude: 51.5085300,
    longitude: -0.1257400
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 8;

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

class ViewJob extends React.Component {

    constructor(props) {
        super(props)
        this.mapElement = {};

      //bind the this prop of the ref to this component
        this.setMapElementReference = this.setMapElementReference.bind(this);
        
        this.state = {
          isGeocodingError: false,
          foundAddress: INITIAL_LOCATION.address
        }
        this.retrieveDataFromServer();
        this.parseDataFromServer = this.parseDataFromServer.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.data = [];
    }

    componentDidMount() {
      var mapElement = this.mapElement;
      
      console.log(mapElement);

      this.map = new google.maps.Map(mapElement, {
        zoom: INITIAL_MAP_ZOOM_LEVEL,
        center: {
          lat: INITIAL_LOCATION.position.latitude,
          lng: INITIAL_LOCATION.position.longitude
        }
      });

      this.marker = new google.maps.Marker({
        map: this.map,
        position: {
          lat: INITIAL_LOCATION.position.latitude,
          lng: INITIAL_LOCATION.position.longitude
        }
      });

      this.geocoder = new google.maps.Geocoder();
    }


    retrieveDataFromServer() {
        $.get('http://localhost:3000/api', (data) => {
          this.parseDataFromServer(data);
        });
    }

    setLocation() {
        // const promise = mapController.setLocation();
        // promise.then((data) => {
        //    mapController.pos = data; 
        //    mapController.map.setCenter(mapController.pos);
        //    this.parseDataFromServer();
        // });  
    }

    getLocation() {

      // let promise = mapController.getLocation();
      // promise.then((data) => { 
      //   mapController.pos = data; 
      //   mapController.map.setCenter(mapController.pos);
      //   this.parseDataFromServer();
      // });
    }

    parseDataFromServer(data) {
      console.log('data', data);
      let validLocations = mapController.getDistance(data);
      validLocations.then(jobdata => {
        mapController.filteredData = jobdata;
        
        //////////////////
        mapController.placeMarkers(jobdata);
        //////////////////

        // this.setState({'jobs': jobdata})
      });
    }

    setMapElementReference(mapElementReference) {
      console.log(this);
      this.mapElement = mapElementReference;
    }


    render() {
      // let jobs = this.data.map((dataPoint, index) => {
      //   return <Job title={dataPoint.title} index={index} description={dataPoint.description} pay={dataPoint.pay} location={dataPoint.address} onClick={() => console.log(index)}/>
      // });
      // executes mapController.showMap before this.props.jobs
      // mapController.showMap();

      const styles = {
        bottom: '0px',
        height: '100%',
        left: '0px',
        position: 'absolute',
        right: '500px',
      }

      return (
        <div>
          <div style = {styles} className="map" ref={this.setMapElementReference}></div>
          <div id='location'>
          <h4 id="setLocation">Set Location</h4>
            <input id="locationInput" type="text"/>
            <button id="locationButton" onClick={this.setLocation}>Set Location</button>
            <button id="currentLocationButton" onClick={this.getLocation}>Use Current Location</button>
          </div>
          <div id='viewjobs'>
              {/*jobs*/}
          </div>
        </div>
      )
    }
}

export default ViewJob;