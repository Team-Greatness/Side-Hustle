const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'phantomjs' } };
const client = webdriverio.remote(options);
 
describe('ViewJob Feature Test', () => {
  before((done) => {
    client.init().url('http://localhost:3000/ViewJob').then(() => done());
  });

  after(function(){
    client.end();
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

        xit('On click, it should display PostJob page', async (done) => {
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

