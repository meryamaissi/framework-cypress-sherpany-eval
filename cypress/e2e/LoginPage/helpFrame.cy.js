describe('help frame validation', () => {
    it('prepare navigator', function () {
        cy.visit("https://app.sherpany.com/")
        //click the get help button
        cy.get('.GetHelpAction_action__4N6WO').click().then(() => {
            cy.get('.chat-fc-form-outer').should('be.visible')
            cy.get('div.fc-form >p ').should('be.visible')
        })
    })

    it('invalid email address', () => {

        cy.get('#chat-fc-sherpanyloginemail').type("this is a test")
        cy.get('#chat-fc-sherpanyloginemail').blur().then(() => {
            cy.get("#chat-fc-sherpanyloginemail-error").should('be.visible')
            cy.get("#chat-fc-sherpanyloginemail").clear()
            cy.get('#chat-fc-sherpanyloginemail').blur().then(() => {
                cy.get("#chat-fc-sherpanyloginemail-error").should('not.be.visible')
            })
        })
    })

    it('empty form submit', () => {
        cy.get('a.fc-button').click().then(() => {
            cy.get("#chat-fc-name-error").should('be.visible')
            cy.get("#chat-fc-sherpanyloginemail-error").should('be.visible')
            cy.get("#chat-fc-language-error").should('be.visible')
        })
    })

    it('valid form submit', () => {
        //type fields value and click 'the start chat' button
        cy.get("li.pre-fc-field > input[type='name']").type('my test')
        cy.get("li.pre-fc-field > input[type='email']").type('test@tt.com')
        cy.get("li.pre-fc-field > select[type='dropdown']").select("French")
        cy.get("a.fc-button").click().then(() => {
            cy.get('iframe#fc_widget').should('exist')
        })
    })

    it('TODO open conversation chat', () => {
        //cy.get('[data-test-id="ui-editor"]').type("this is a test")
    })
    //cy.get(".fc-minimize").click()  
    //cy.clearCookies()
})