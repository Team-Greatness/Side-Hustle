const {Builder, By, until} = require('selenium-webdriver');
const client = require('webdriverjs').remote({
    desiredCapabilities: {
        // You may choose other browsers
        // http://code.google.com/p/selenium/wiki/DesiredCapabilities
        browserName: 'phantomjs'
    },
    // webdriverjs has a lot of output which is generally useless
    // However, if anything goes wrong, remove this to see more details
    // logLevel: 'silent'
});

const chai = require('chai');
// var chaiWebdriver = require('chai-webdriver-promised');
// chai.use(chaiWebdriver(driver, timeout, interval));

const assert = chai.assert;
const expect = chai.expect;

describe('Post Job page', () => {
  // before( (done) => {
  //   driver.get('http://localhost:3000').then(done); 
  //const browser = new Browser(); // Zombie testing
  //browser.silent = true; // Zombie testing

  before((done) => {
    client.init().url('http://localhost:3000/PostJob', done);
  }); 

  after(function(){
    client.end();
  });

  it('It should display Title field', () => {
    // expect('#title').dom.to.not.be.visible(); 
    expect(client.By.id('titleField')).to.exist; 
  });

  xit('It should display Description field', () => {
    expect('#description').dom.to.be.visible(); 
  }); 

  xit('It should display Address field', () => {
    expect('#address').dom.to.be.visible(); 
  });

  xit('It should display Pay field', () => {
    expect('#pay').dom.to.be.visible(); 
  });

  describe('Submit button', () => {
    xit('Should display Submit button.', () => {
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