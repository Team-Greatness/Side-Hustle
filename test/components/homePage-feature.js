// Start with a webdriver instance:
var sw = require('selenium-webdriver');
var browser = sw.Capabilities.phantomjs();
var phantomjs_exe = require('phantomjs-prebuilt').path;
browser.set("phantomjs.binary.path", phantomjs_exe);
var driver = new sw.Builder()
  .withCapabilities(browser)
  .build();

//optional timeout in ms to use with eventually (defaults to 1000)
  var timeout = 15000;
//optional interval in ms to use when polling (defaults to 200)
  var interval = 100;

// // And then...
  var chai = require('chai');
  var chaiWebdriver = require('chai-webdriver-promised');
  chai.use(chaiWebdriver(driver, timeout, interval));

// const assert = chai.assert;
const expect = chai.expect;

describe('Home page', () => {

  before(() => {
    driver.get('http://localhost:3000');
  }); 

  after(function(done){
    // End of test use this.
    driver.quit().then(() => done());
  });

  describe('Post Job button', () => {
    it('Should display PostJob button', () => {
     expect(':button #postJob').dom.to.be.visible();  // ToDo: add this id to button 
    });

    xit('On click, it should display PostJob page', () => {
      // TODO
    });
  });

  describe('View Job button', () => {
    it('Should display View Job button', () => {
      expect(':button #viewJob').dom.to.be.visible();  // ToDo: add this id to button 
    });

    xit('On click, it should reload the ViewPage (current page)', () => {
      // TODO
    });     
  });
}); 


