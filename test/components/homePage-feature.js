const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'phantomjs' } };
const client = webdriverio.remote(options);

describe('Home page', () => {

  before((done) => {
    client.init().url('http://localhost:3000/ViewJob').then(() => done());
  });

  after(function(){
    client.end();
  });

  describe('Post Job button', () => {
    xit('Should display PostJob button', () => {
     expect(':button #postJob').dom.to.be.visible();  // ToDo: add this id to button 
    });

    xit('On click, it should display PostJob page', () => {
      // TODO
    });
  });

  describe('View Job button', () => {
    xit('Should display View Job button', () => {
      expect(':button #viewJob').dom.to.be.visible();  // ToDo: add this id to button 
    });

    xit('On click, it should reload the ViewPage (current page)', () => {
      // TODO
    });     
  });
}); 


