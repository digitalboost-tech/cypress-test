/// <reference types="cypress" />

//Login as a volunteer
context("volunteer-login", () => {
  beforeEach(() => {
    cy.visit(
      "https://volunteer.development.digitalboost.org.uk/login?redirect=/"
    )
  })

  it("can input username, password and login successfully", () => {
    cy.get('h1').should('contain','I am a volunteer')
    cy.fixture('volunteer-loginDetails').then((volunteer)=>{
      cy.get('input[type="text"]').type(volunteer.email)
      cy.get('input[type="password"]').type(volunteer.password)
    })
    cy.get('.button-primary').contains('Login').click()
    cy.url({timeout:7000}).should('include','signup-option')
    cy.get('h1').should('contain',' Welcome! Let’s setup your profile')

  })

  //login as a volunteer with invalid details
  it("invalid volunteer login details", () => {
    cy.get('input[type="text"]').type('123@gmail.com')
    cy.get('input[type="password"]').type('1234hjk')
    cy.get('.button-primary').contains('Login').click()
    cy.get('div[class="error"]',{timeout:7000})
    .should('have.text','No active account found with the given credentials')

  })
})




