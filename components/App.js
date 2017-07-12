import React, { Component } from 'react';
import { render } from 'react-dom';
import ViewJob from './viewJob.js';
import Job from './Job.js';
import FormOfInformation from './Form.js';
import { IndexRoute } from 'react-router';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import $ from 'jquery';
import mapController from './../controller/mapController'
import Header from './Header.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Creates a job component for each job request in the database
    componentDidMount() {
        console.log('passed');
    }

    render() {
       const rootStruct = (props) => {
            return (
              <div>
                <Header />
              </div>
            );
        }
        const styles = {
            float: 'none',
            'text-align': 'center',
        }
        return (
          // React Router is used to render components based on the route specified
          // 
          <Router>
            <Switch>
              <Route exact={true} path='/' component={rootStruct} />
              <Route path="/PostJob" component={FormOfInformation} />
              <Route path="/ViewJob" component={ViewJob} />
            </Switch>
          </Router>
        )
    }
}

export default App;