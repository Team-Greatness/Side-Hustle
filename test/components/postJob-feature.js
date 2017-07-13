const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'phantomjs' } };
const client = webdriverio.remote(options);

describe('Post Job page', () => {
  // before( (done) => {
  //   driver.get('http://localhost:3000').then(done); 
  //const browser = new Browser(); // Zombie testing
  //browser.silent = true; // Zombie testing

  before((done) => {
    client.init().url('http://localhost:3000/PostJob').then(() => done());
  });

  after(function(){
    client.end();
  });

  it('It should display Title field', async () => {
    const isExisting = await client.isExisting('#title');
    expect(isExisting).to.be.true;
  });

  it('It should display Description field', async () => {
    const isExisting = await client.isExisting('#description');
    expect(isExisting).to.be.true;
  }); 

  it('It should display Address field', async () => {
    const isExisting = await client.isExisting('#address');
    expect(isExisting).to.be.true;
  });

  it('It should display Pay field', async () => {
    const isExisting = await client.isExisting('#pay');
    expect(isExisting).to.be.true;
  });

  describe('Submit button', () => {
    it('Should display Submit button.', async () => {
      const isExisting = await client.isExisting("[type='submit']");
      const getValue = await client.getValue("[type='submit']");
      expect(isExisting).to.be.true;
      expect(getValue).to.equal('Submit');
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
    it('Should display PostJob button', async () => {
      const isExisting = await client.isExisting('#postJob');
      expect(isExisting).to.be.true;
    });

    xit('On click, it should display PostJob page (current page)', () => {
      //don't really need this one since it doesn't do anything.
    });
  });

  describe('View Job button', () => {
    it('Should display View Job button', async () => {
      const isExisting = await client.isExisting('#viewJob');
      expect(isExisting).to.be.true;
    });

    xit('On click, it should reload the ViewJob Page', () => {
      // TODO
    });     
  });
}); 