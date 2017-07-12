// const Browser = require('zombie'); // use headless browser 

// Start with a webdriver instance:
var sw = require('selenium-webdriver');
var driver = new sw.Builder()
   .withCapabilities(sw.Capabilities.chrome())
   .build()

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

describe('Post Job page', () => {
  // before( (done) => {
  //   driver.get('http://localhost:3000').then(done); 
  //const browser = new Browser(); // Zombie testing
  //browser.silent = true; // Zombie testing

  before(() => {
    driver.get('http://localhost:3000');
    //browser.visit(`http://localhost:3000/`, done); // for Zombie testing
  }); 

  it('It should display Title field', () => {
    // expect('#title').dom.to.not.be.visible(); 
    expect('#title').dom.to.not.be.visible(); 
  });

  it('It should display Description field', () => {
    expect('#description').dom.to.be.visible(); 
  }); 

  it('It should display Address field', () => {
    expect('#address').dom.to.be.visible(); 
  });

  it('It should display Pay field', () => {
    expect('#pay').dom.to.be.visible(); 
  });

  describe('Submit button', () => {
    it('Should display Submit button.', () => {
      expect('button[type="submit"]').dom.to.be.visible(); // verify this works
    }); 

    xit('On click, it should redirect user to the ViewJob page.', () => {
      let viewJobButton = browser.queryAll(".square")[0]; 
      // console.log(viewJobButton); 
      browser.fire(square, 'click', ()=>{
        // test functionality in here 
      }); 

    }); 
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