describe('Login page Api testing', () => {
    
        describe(('Login form API'), () => {
        it(('GET authenticate/status '), () => {
            cy.request({
                method: 'GET',
                url: 'https://app.sherpany.com/api/authenticate/status/'
            }).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.body.status).to.eq('success')
                expect(resp.body.code).to.eq('completed-successfully')
                expect(resp.body.proof_status.is_authenticated).to.eq(false)
            })

        })
        it(('login invalid email password'), () => {
            cy.request({
                method: 'POST',
                url: 'https://app.sherpany.com/api/authenticate/primary/password/prove/',
                qs: {
                    'email': 'test@tt.com',
                    'password': 'this is a test'
                },
                failOnStatusCode: false

            }).then((resp) => {
                expect(resp.status).to.eq(400)
                expect(resp.body.status).to.eq('fail')
                expect(resp.body.code).to.eq('authentication:password:wrong-password')
            })

        })

    })
    
    describe('get help Api testing', () => {
      

        it('get help with non authenticated user', () => {
            cy.request({
                method: 'GET',
                url: 'https://wchat.freshchat.com/app/services/app/webchat/7fca8fa1-9815-4fb9-a5a0-e6b265bf4457/user',
            }).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.body.success).to.eq(false)
                expect(resp.body.errorCode).to.eq(1)
            })
        })

        it('start chat API testing in English', () => {
            cy.initiateChatLanguage('en-US,en-US').as('response').then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.channelResponse.contentLocale.language).to.eq('eng')
            })
        })
        it('start chat API testing in French', () => {
            cy.initiateChatLanguage('fr-FR,fr-FR').as('responseFR').then((responseFR) => {
                expect(responseFR.status).to.eq(200)
                expect(responseFR.body.channelResponse.contentLocale.language).to.eq('fra')
            })
        })
        it('start chat API testing in German', () => {
            cy.initiateChatLanguage('de-CH,de-CH').as('responseFR').then((responseGR) => {
                expect(responseGR.status).to.eq(200)
                expect(responseGR.body.channelResponse.contentLocale.language).to.eq('deu')
            })
        })
        it('start chat API testing in Italian', () => {
            cy.initiateChatLanguage('it,it').as('responseIT').then((responseIT) => {
                expect(responseIT.status).to.eq(200)
                expect(responseIT.body.channelResponse.contentLocale.language).to.eq('ita')
            })
        })
    })



    // todo
    it('', () => {

    })
    
    it('', () => {

    })


})
