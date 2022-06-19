describe('Validate translations', () => {
    beforeEach(() => {
        //set view port to display the change language select
        //cy.clearCookies()
        cy.viewport(1500, 1000)
        cy.visit("https://app.sherpany.com/").then(() => {
            // get HTML elements
            cy.get('button[type="submit"]>span').as("submitBtn")
            cy.get('label[for="password"]').as("passwordLabel")
            cy.get('label[for="email"]').as("emailLabel")
            cy.get('.PrimaryLogin_forgotPasswordAction__VPXKh > span').as('forgetPasswordLink')
            cy.get('span.AlternativeAction_label__TeIfN').as('formSeparator')
            cy.get('button.Button_secondary__EwyZi.Button_blue__GB_Z2>span').as('ssoButton')
            cy.get('div.RequestDemoAction_container__uqBFr > span').as("requestDemoText")
            cy.get('.RequestDemoAction_container__uqBFr > a').as("requestDemoLink")
            cy.get('.GetHelpAction_action__4N6WO>span').as('getHelpLink')
            cy.get('ul.FooterLinks_list__JqofQ > li').as("footerLinkList")
            cy.get('span.NativeAppsLinks_label__rc2b5').as('downloadAppText')
        })
    })
    function validateloginTranslation() {
        //cy.fixture(translationJson).as("translation")
        cy.get('@translation').then((translationFile) => {
            cy.get('@submitBtn').contains(translationFile["Log in"])
            //cy.get('@passwordLabel').should('have.text', translationFile["password"])
            //cy.get('@emailLabel').should('have.text', translationFile["email"])
            // link forget password 
            cy.get('@forgetPasswordLink').contains(translationFile["Forgot password?"])
            // form separator 
            cy.get('@formSeparator').contains(translationFile["or"])
            // sso button
            cy.get('@ssoButton').contains(translationFile["Log in with SSO"])
            // request demo link and text
            cy.get('@requestDemoText').contains(translationFile["No account yet?"])
            cy.get('@requestDemoLink').contains(translationFile["Request a demo"])
            // get help link
            cy.get('@getHelpLink').contains(translationFile["Get help"])
            // list 2 nd link
            cy.get('@footerLinkList').eq(1).children().contains(translationFile["Meeting resources"])
            // list 3rd link
            cy.get('@footerLinkList').eq(2).children().contains(translationFile["Privacy policy"])
            // list 4th link
            cy.get('@footerLinkList').eq(3).children().contains(translationFile["Terms of use"])
            // text before App links 
            cy.get('@downloadAppText').contains(translationFile["Download on"])
        })
    }

    function validateErrorMessages() {
        cy.get('@submitBtn').click().then(() => {
            cy.get('.ErrorMessage_message__GdM4G').should('be.visible')
            cy.get('@translation').then((translationFile) => {
                cy.get('.ErrorMessage_message__GdM4G').contains(translationFile["Please enter a valid email address."])
                // invalid email password
                cy.get("#email").type('this@is.test')
                cy.get("#password").type('test')
                cy.get('@submitBtn').click().then(() => {
                    cy.get('.ErrorMessage_message__GdM4G').should('be.visible')
                    cy.get('.ErrorMessage_message__GdM4G').should('have.text', translationFile["We couldn't log you in. Please check your email address and password and try again."])
                })
            })
        })
    }
    function validateLoginSSOForm() {
        cy.get('@ssoButton').click().then(() => {
            cy.get('#password').should('not.exist')
            cy.get('@translation').then((translationFile) => {
                cy.get('h1.ContentBoxTitle_heading__ryO0N').should('have.text', translationFile['Log in with SSO'])
                cy.get('button[type=submit] >span').contains(translationFile['Log in with SSO'])
                cy.get('button.SSOLogin_loginWithPasswordAction___1aBy >span').should('have.text', translationFile['Log in with password'])
            })
        })
    }
    function validateGetHelpFrame() {
        //click the get help button
        cy.get('.GetHelpAction_action__4N6WO').click().then(() => {
            cy.get('@translation').then((translationFile) => {
                cy.wait(3000) // wait 3 seconds to render the Get Help frame 
                cy.get('div.chat-fc-form-outer').should('be.visible')
                cy.get('div.fc-form >p ').should('be.visible').then(() => {
                    //check the frame header
                    cy.get('p.fc-header').as('headerFrame')
                    cy.validateLabelText('@headerFrame', translationFile['Sherpany Support'])
                    //check the frame welcome text
                    cy.get('div.fc-form >p').should('have.text', translationFile['We´re happy to talk to you. First, please take a moment to tell us a little bit more about you so that we can provide you with the best service possible.'])
                    //get the list of form fields
                    cy.get('form.chat-fc-form > ul >li').as('formFields')
                    //name field
                    cy.get('@formFields').eq(0).children().as('nameField')
                    cy.validateLabelText('@nameField', translationFile['Name'])
                    //Email field
                    cy.get('@formFields').eq(1).children().as('emailField')
                    cy.validateLabelText('@emailField', translationFile['Sherpany Login Email'])
                    //Language field
                    cy.get('@formFields').eq(2).children().as('languageField')
                    cy.validateLabelText('@languageField', translationFile['Language'])
                    //start chat button 
                    cy.get('a.fc-button').should('have.text', translationFile['Start Chat'])

                }).then(() => {
                    //validate error message
                    cy.get("a.fc-button").click().then(() => {
                        cy.get('@formFields').eq(1).children().eq(2).should('be.visible').then(() => {
                            cy.get('@formFields').eq(0).children().eq(2).should('have.text', translationFile['Please enter a valid name'])
                            cy.get('@formFields').eq(1).children().eq(2).should('have.text', translationFile['Please enter a valid email'])
                            cy.get('@formFields').eq(2).children().eq(2).should('have.text', translationFile['Please select a language'])
                        })
                    })
                    //type fields value and click 'the start chat' button
                    cy.get("li.pre-fc-field > input[type='name']").type('my test')
                    cy.get("li.pre-fc-field > input[type='email']").type('test@tt.com')
                    cy.get("li.pre-fc-field > select[type='dropdown']").select("French")
                    //close get help frame
                    cy.get('p.fc-header >span').click()
                    /*
                     cy.get("a.fc-button").click().then(() => {
                     cy.get('div.fc-conversation-view').should('be.visible').then(() => {
                     //close get help frame
                     cy.get("div.d_hotline.minimize").click()
                     //couldnt continu testing because it always display frame in english
                     })
                     })*/
                })
            })
        })
    }
    describe('Validate English form', () => {
        beforeEach(() => {
            // load translation file 
            cy.fixture("translation_en.json").as("translation")
            // select French language
            cy.get('.LanguageSwitcher_container__bwBG7').click().then(() => {
                cy.get('div[label="English"]').click()
            })
        })
        it('validate login form', () => {
            validateloginTranslation("@translation") // translation file is manually created by me just for test
        })
        it('validate Get Help frame', () => {
            validateGetHelpFrame('@translation')
        })
        it('validate SSO Form', () => {
            validateLoginSSOForm('@translation')
        })
        it('validate error messages in login Form', () => {
            validateErrorMessages('@translation')
        })
    })
     describe('Validate French form', () => {
     beforeEach(() => {
     // load translation file 
     cy.fixture("translation_fr.json").as("translation")
     // select French language
     cy.get('.LanguageSwitcher_container__bwBG7').click().then(() => {
     //cy.contains('Français').click()
     cy.get('div[label="Français"]').click()
     })
     })
     it('validate login form', () => {
     validateloginTranslation("@translation") // translation file is manually created by me just for test
     })
     it('validate Get Help frame', () => {
     validateGetHelpFrame('@translation')
     })
     it('validate SSO Form', () => {
     validateLoginSSOForm('@translation')
     })
     it('validate error messages in login Form', () => {
     validateErrorMessages('@translation')
     })
     })
     describe('Validate Italiano form', () => {
     beforeEach(() => {
     // load translation file 
     cy.fixture("translation_it.json").as("translation")
     // select Italian language
     cy.get('.LanguageSwitcher_container__bwBG7').click().then(() => {
     cy.get('div[label="Italiano"]').click()
     })
     })
     it('validate login form', () => {
     validateloginTranslation("@translation")
     })
     it('validate Get Help frame', () => {
     validateGetHelpFrame('@translation')
     })
     it('validate SSO Form', () => {
     validateLoginSSOForm('@translation')
     })
     it('validate error messages in login Form', () => {
     validateErrorMessages('@translation')
     })
     })
     describe('Validate Deutsch form', () => {
     beforeEach(() => {
     // load translation file 
     cy.fixture("translation_de.json").as("translation")
     // select Deutsch language
     cy.get('.LanguageSwitcher_container__bwBG7').click().then(() => {
      cy.get('div[label="Deutsch"]').click()
     })
     })
     it('validate login form', () => {
     validateloginTranslation("@translation")
     })
     it('validate Get Help frame', () => {
     validateGetHelpFrame('@translation')
     })
     it('validate SSO Form', () => {
     validateLoginSSOForm('@translation')
     })
     it('validate error messages in login Form', () => {
     validateErrorMessages('@translation')
     })
  })
})