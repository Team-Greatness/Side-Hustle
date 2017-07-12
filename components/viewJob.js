import React, { Component } from 'react';
import { render } from 'react-dom'
import Job from './Job.js'
import mapController from '../controller/mapController.js';
import $ from 'jquery';
import Header from './Header.js'

const INITIAL_LOCATION = {
  address: 'Los Angeles, CA USA',
  position: {
    latitude: 33.979089,
    longitude: -118.422812
  }
};

let INITIAL_MAP_ZOOM_LEVEL = 8;

class ViewJob extends React.Component {

    constructor(props) {
        super(props)

      //bind the this prop of the ref to this component
        this.setMapElementReference = this.setMapElementReference.bind(this);
        this.hasSetMapElRef = false;
        this.state = {
          isGeocodingError: false,
          foundAddress: INITIAL_LOCATION.address,
          jobs: []
        }
        this.parseDataFromServer = this.parseDataFromServer.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.data = [];
    }

    componentDidMount() {
      let mapElement = this.mapElement;

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
        const promise = mapController.setLocation();
        promise.then((data) => {
           mapController.pos = data; 
           mapController.map.setCenter(mapController.pos);
           //data object needs to contain list not location
           this.parseDataFromServer();
        });  
    }

    getLocation() {
      let promise = mapController.getLocation();
      promise.then((data) => { 
         //data object needs to contain list not location
         this.parseDataFromServer();
      });
    }

    parseDataFromServer(data) {
      if (!data) data = this.state.jobs;
      let validLocations = mapController.getDistance(data);
      validLocations.then(jobdata => {
        mapController.filteredData = jobdata;
        mapController.placeMarkers(jobdata);
        this.setState({'jobs': jobdata})
      });
    }

    setMapElementReference(mapElementReference) {
      this.mapElement = mapElementReference;
      if (this.hasSetMapElRef === false) this.getServerData();
    }

    getServerData() {
      this.hasSetMapElRef = true;
      this.setState({'done': 'super'});
      this.retrieveDataFromServer();
      this.setInitials();
    }

    setInitials() {
      this.map = new google.maps.Map(this.mapElement, {
        zoom: INITIAL_MAP_ZOOM_LEVEL,
        center: {
          lat: INITIAL_LOCATION.position.latitude,
          lng: INITIAL_LOCATION.position.longitude
        }
      });
      mapController.setMap(this.map);
    }

    render() {
      let jobs = this.state.jobs.map((dataPoint, index) => {
        return <Job title={dataPoint.title} index={index} description={dataPoint.description} pay={dataPoint.pay} location={dataPoint.address} onClick={() => console.log(index)}/>
      });
      // executes mapController.showMap before this.props.jobs
      // mapController.showMap();

      console.log('jobs',jobs);

      const styles = {
        map: {
          bottom: '0px',
          height: '100%',
          left: '0px',
          position: 'absolute',
          right: '500px',
        },
        right: {
          float: 'right'
        },
        jobList: {
          clear: 'both',
          paddingTop: 39
        }
      }

      return (
        <div>
          <div style = {styles.map} className="map" ref={this.setMapElementReference}></div>
          <div style = {styles.right}>
            <Header />
            <div id='location'>
            <h4 id="setLocation">Set Location</h4>
              <input id="locationInput" type="text"/>
              <button id="locationButton" onClick={this.setLocation}>Set Location</button>
              <button id="currentLocationButton" onClick={this.getLocation}>Use Current Location</button>
            </div>
            <div id='viewjobs' style={styles.jobList}>
                {jobs}
            </div>
          </div>
        </div>
      )
    }
}

export default ViewJob;