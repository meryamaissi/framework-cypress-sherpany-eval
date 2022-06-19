describe('help frame validation', () => {

  /*  function mockLocation(latitude, longitude) {
        return {
        onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((cb, err) => {
        if (latitude && longitude) {
        return cb({ coords: { latitude, longitude } });
        }           throw err({ code: 1 }); });
        }     };
    }*/

    it('prepare navigator', function () {
        module.exports = (on, config) => {
            on('before:browser:launch', (browser = {}, args) => {
              if (browser.name === 'chrome') {
                args.push('--lang=de')
                return args
    }
  })
}
cy.visit('https://app.sherpany.com/')
        
    // set default language
    // set location

    //set default browser language
  
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
   /* cy.visit('https://app.sherpany.com/', {onBeforeLoad : (win)=>{
        Object.defineProperty(win.navigator, 'language', {value:'de-GE'})
        }})*/

   
            // set italian position 
            //cy.visit("https://app.sherpany.com/", mockLocation(48.78062348304675, 2.461512730419663));
            /* it('prepare navigator', () => {
             cy.visit("https://app.sherpany.com/")

             })*/
    })

        })
