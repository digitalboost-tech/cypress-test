/// <reference types="cypress" />

//login with Digital Boost account
import organisationLogin from '../pageObjects/organisationLogin'

context("organisation-login", () => {
  beforeEach(() => {
    cy.visit(
      "https://organisation.development.digitalboost.org.uk/login?redirect=/"
    )
  })
  const organisationlogin = new organisationLogin()
  it("can input username, password and login successfully", () => {
    cy.get('h3').should('contain','Login with Email')
    cy.fixture('organisation-loginDetails').then((organisation)=>{
        organisationlogin.digitalBoostaccemail().type(organisation.email)
        organisationlogin.digitalBoostaccpwd().type(organisation.password)
    })
    cy.get('.button').contains('Login').click()
    cy.url().should('include','digitalboost')
    cy.get('div[class="menu-box"]',{timeout:12000})
      .should('contain','Logout')

    })
})
