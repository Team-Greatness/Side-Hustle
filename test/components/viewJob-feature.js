// Start with a webdriver instance: 
// var sw = require('selenium-webdriver');
// const By = sw.By;
// const until = sw.until;
// var driver = new sw.Builder()
//   .forBrowser('chrome')
//   .build();

// // And then... 
// var chai = require('chai');
// var chaiWebdriver = require('chai-webdriver');
// chai.use(chaiWebdriver(driver));

// // const assert = chai.assert;
// const expect = chai.expect;
// chai.should();


// driver.findElement(By.name('q')).sendKeys('webdriver');
// driver.findElement(By.name('btnG')).click();
// driver.wait(until.titleIs('webdriver - Google Search'), 1000);
// driver.quit();


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
 
describe('ViewJob Feature Test', () => {
  before(() => {
    driver.get('http://localhost:3000');
    // driver.findElement(By.name('viewJob')).click();
    // driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  });
  // Describe Google Maps it's on page 
  describe('Google Maps', () => {
    it('Should display Google Map', () => {
      expect('#map').dom.to.be.visible();
    }); 

    xit('Should have 4 markers', () => {
      // TODO 
    });  

    xit('Clicking on marker should display job info.', () => {
      // TODO 
    });

  });

  describe('Sidebar', () => {

    describe('Job List ', () => {
      xit('Should display the job list', () => {
        expect('.viewJobs').dom.to.not.be.visible(); 
      });

      xit('Should display title', () => {
       //  expect('.viewJobs')[0].dom.to.not.be.visible(); 
      });

      xit('Should display description', () => {
        // TODO 
      });

      xit('Should display pay', () => {
        // TODO 
      });

      xit('Should display location', () => {
        // TODO 
      });

    });

    describe('Buttons', () => {

      describe('Post Job', () => {
        xit('Should display PostJob button', () => {

        });

        xit('On click, it should display PostJob page', () => {

        });


      });

      describe('View Job', () => {
        xit('Should display View Job button', () => {

        });

        xit('On click, it should reload the ViewPage (current page)', () => {

        });

         
      });


      describe('Set Location', () => {
        xit('Should display Set Location text field', () => {

        });

        xit('Should display Set Location button', () => {

        });

        xit('Clicking Set Location should display location', () => {

        });  
      });

      describe('Use Current Location', () => {
        xit('Should display Use Current Location button', () => {

        });

        xit('Clicking on Use Current Location should display location', () => {

        });  
      });

    });  

  }); 

}); 

