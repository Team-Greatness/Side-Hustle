// Start with a webdriver instance: 
var sw = require('selenium-webdriver');
const By = sw.By;
const until = sw.until;
var browser = sw.Capabilities.phantomjs();
var driver = new sw.Builder()
  .withCapabilities(browser)
  .build();

// // And then... 
var chai = require('chai');
// var chaiWebdriver = require('chai-webdriver');
// 

//optional timeout in ms to use with eventually (defaults to 1000)
  var timeout = 15000;
//optional interval in ms to use when polling (defaults to 200)
  var interval = 100;

// // And then...
  var chaiWebdriver = require('chai-webdriver-promised');
  chai.use(chaiWebdriver(driver, timeout, interval));

// chai.use(chaiWebdriver(driver));

const assert = chai.assert;
const expect = chai.expect;
chai.should();


// driver.findElement(By.name('q')).sendKeys('webdriver');
// driver.findElement(By.name('btnG')).click();
// driver.wait(until.titleIs('webdriver - Google Search'), 1000);
// driver.quit();


// Start with a webdriver instance:
// var driver = new sw.Builder()
//    .withCapabilities(sw.Capabilities.chrome())
//    .build()

 
describe('ViewJob Feature Test', () => {
  before((done) => {
    driver.get('http://localhost:3000').then(() => {
      driver.findElement(sw.By.id('viewJob')).click().then(() => {
        done();
      })
    });
      // driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  });

  after(function(done){
    // End of test use this.
    driver.quit().then(() => done());
  });

  // Describe Google Maps it's on page 
  describe('Google Maps', () => {
    xit('Should display Google Map', () => {
      // const map = driver.findElement
      expect('.map').dom.to.not.be.visible();
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

      xit('Should display title', (done) => {
       //  expect('.viewJobs')[0].dom.to.not.be.visible(); 
        driver.findElement(sw.By.css('.viewJobs')).then((listOfJobs) => {
          console.log(listOfJobs.getText()); 
          done();
        });
       // let jobText = listOfJobs[0].getText(); 
       // console.log(jobText); 
       // expect(jobText).to.eventually.equal('Title: real title'); 
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

        it('On click, it should display PostJob page', async (done) => {
          // driver.findElement(By.css('#postJob')).click().then( async () => {
          //     const el = await driver.findElement(By.css('.inputText'))
          //     console.log(el);
          //   });
          
          driver.findElement(By.css('#postJob')).click();
          // expect(await driver.findElements(By.xpath("//input[@type='submit' and @value='Submit']")).to.equal(true);
          expect('submit').dom.to.have.attribute('Subm2it', 'value');
          done();
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
  // driver.quit();
}); 

