// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



//  -- This is a command to send initiateChat request related to a sepecific language --
  Cypress.Commands.add("initiateChatLanguage", (locales) => {
            cy.request({
                method: 'GET',
                url: 'https://wchat.freshchat.com/app/services/app/webchat/7fca8fa1-9815-4fb9-a5a0-e6b265bf4457/widget_info_v2',
                qs: {
                    'locales': locales,
                    'platform': 'web'
                }
            }).then((res) => {
                return (res)
            })
        })
		
  // -- This is a Commande to get label text from Node and validate it's text --
        Cypress.Commands.add("validateLabelText", (elementNode, expectedText) => {
            return (cy.get(elementNode).should(($el) => {
                expect(
                        $el
                        .contents() // Grab all node contents
                        .first() // The text node
                        .text() // Get the text
                        .trim() // trim the white space
                        ).to.eq(expectedText)
            })
                    )
        })