describe('Validate elements of the page', () => {

    function validateFooterLinkUrl(listID, childNumber, expectedUrl) {
            cy.get(listID).eq(childNumber).children().invoke('removeAttr', 'target').click().then(() => {
            cy.url().should('eq', expectedUrl)
        })
        return
    }

    it('prepare navigator', function () {
        cy.visit("https://app.sherpany.com/")
    })
    describe('validate form', () => {
        it('validate email input', () => {
            cy.get('#email').type("this is a test")
            cy.get('span.anticon.anticon-close-circle.ant-input-clear-icon').click()
            cy.get('#email').should('contain', '')
        })
        it('submit with invalide email password', () => {

            //ckeck uncorrect email format
            cy.get('#email').type('mery@sherpany.com');
            cy.get('#password').type('azerty');
            //cy.get('#password').invoke('attr', 'class').should('eq','ant-input')
            cy.get('form').submit()
            // ErrorMessage should be visible
            cy.get('.ErrorMessage_message__GdM4G').should('be.visible')
            // input fields must be red bordered
            cy.get('#password').parent().invoke('attr', 'class').should('contains', 'Input_error__HPh_6')
            cy.get('#email').parent().invoke('attr', 'class').should('contains', 'Input_error__HPh_6')

        })
    })
    describe('validate links', () => {
        it('Check Log in with SSO button with already typed email', () => {
            cy.get('#email').type('try@sso.com')
            cy.get('.Button_secondary__EwyZi.Button_blue__GB_Z2').click()
            cy.get('.ContentBoxTitle_heading__ryO0N').contains("SSO")
            cy.get('#email').should('be.empty')
            cy.get('#password').should('not.exist')
            cy.get('#email').type('try2@sso.com')
            cy.get('form').submit()

            cy.get('button.SSOLogin_loginWithPasswordAction___1aBy').click()
        })
        it('Check form links', () => {
            // check forgotPassword link
            cy.get('.PrimaryLogin_forgotPasswordAction__VPXKh').click()
            cy.url().should('include', '/password/reset/')
            cy.go('back')

            // check request a demo link
            cy.get('.RequestDemoAction_container__uqBFr > a').invoke('removeAttr', 'target').click()
            cy.url().should('include', '/?utm_source=app&utm_medium=cta&utm_campaign=app_demo')
            cy.go('back')
        })
        it('Check footer links', () => {
            //validate footer link list
            cy.get('ul.FooterLinks_list__JqofQ').children().should('have.length', 4)

            // check sherpany.com link
            validateFooterLinkUrl('ul.FooterLinks_list__JqofQ > li', 0, 'https://www.sherpany.com/en/')
            cy.go('back').then(() => {

                // check Meeting resources link
                validateFooterLinkUrl('ul.FooterLinks_list__JqofQ > li', 1, 'https://www.sherpany.com/en/resources/meeting-management/')
            })
            cy.go('back').then(() => {
                // check Privacy Policy link
                validateFooterLinkUrl('ul.FooterLinks_list__JqofQ > li', 2, 'https://www.sherpany.com/en/privacy-policy/')
            })
            cy.go('back').then(() => {
                // check terms of use link
                validateFooterLinkUrl('ul.FooterLinks_list__JqofQ > li', 3, 'https://app.sherpany.com/terms/')
            })
            cy.go('back')
        })

        it('Check external links', () => {
            cy.get('ul.NativeAppsLinks_list__4RisE').children().should('have.length', 3)
            // Appel app 
            cy.get("ul.NativeAppsLinks_list__4RisE > li ").eq(0).children().as('appleLink')
            cy.get('@appleLink').invoke('attr', 'href').should('eq', 'https://itunes.apple.com/app/id1172873177')
            // Google play app 
            cy.get("ul.NativeAppsLinks_list__4RisE > li ").eq(1).children().invoke('attr', 'href').should('eq', 'https://play.google.com/store/apps/details?id=ch.sherpany.boardroom')
            // Microsoft store app 
            cy.get("ul.NativeAppsLinks_list__4RisE > li ").eq(2).children().invoke('attr', 'href').should('eq', 'https://www.microsoft.com/store/apps/9NH1PR95ZXF7')
        })
    })
})