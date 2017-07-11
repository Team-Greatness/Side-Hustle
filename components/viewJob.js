import React, { Component } from 'react';
import { render } from 'react-dom'
import Job from './Job.js'
import mapController from '../controller/mapController.js';
import $ from 'jquery';
import GoogleMap from 'google-map-react';

class ViewJob extends Component {
    constructor(props) {
        super(props)
        this.retrieveDataFromServer();
        this.parseDataFromServer = this.parseDataFromServer.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.data = [];
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
           this.parseDataFromServer();
        });  
    }

    getLocation() {

        let promise = mapController.getLocation();
        promise.then((data) => { 
          mapController.pos = data; 
          mapController.map.setCenter(mapController.pos);
          this.parseDataFromServer()
        });
    }

    parseDataFromServer() {
      console.log('data');
      let data = mapController.data; 
      let validLocations = mapController.getDistance(data);
       validLocations.then(jobdata => {
         mapController.filteredData = jobdata;
         mapController.placeMarkers(jobdata);
         this.setState({'jobs': jobdata})
       });
    }

    render() {
        let jobs = this.data.map((dataPoint, index) => {
            return <Job title={dataPoint.title} index={index} description={dataPoint.description} pay={dataPoint.pay} location={dataPoint.address} onClick={() => console.log(index)}/>
        });
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
              <div style = {styles}>
                <GoogleMap 
                  bootstrapURLKeys={{
                      key: 'AIzaSyABacmrJFf7rQqMBuQb5juvZefnNsvZQT4&v',

                  }}
                  zoom={11}
                  center={{lat: 33.979089, lng: -118.422812}}
                />
              </div>
              <div id='location'>
              <h4 id="setLocation">Set Location</h4>
                <input id="locationInput" type="text"/>
                <button id="locationButton" onClick={this.setLocation}>Set Location</button>
                <button id="currentLocationButton" onClick={this.getLocation}>Use Current Location</button>
              </div>
              <div id='viewjobs'>
                  {jobs}
              </div>
            </div>
        )
    }
}

export default ViewJob;