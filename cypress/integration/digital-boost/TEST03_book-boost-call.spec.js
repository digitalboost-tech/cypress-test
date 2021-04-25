/// <reference types="cypress" />

//book Boost call successfully
import organisationLogin from '../pageObjects/organisationLogin'

context("Actions", () => {
  beforeEach(() => {
    cy.visit(
      "https://organisation.development.digitalboost.org.uk/mentor-select"
    )
  })
  const organisationlogin = new organisationLogin()
  it("can book Boost Call successfully", () => {
    //1.Select your mentor
    cy.get('h1')
      .should('contain','1. Select your mentor')
    cy.get('h3')
      .should('contain',' Select Learning Subjects')
    cy.get('div[class="skill-list"]')
      .get('div[class="parent-skill"]')
      .eq(1).click()
      .should('have.text','Design and branding')
      .get('label').contains('Branding and logos').click()
      .get('label').contains('Visual design').click()
    cy.get('div[class="mentor-view"]')
      .get('div[class="frame"]')
      .get('.select-button')
      .eq(1).click({force: true})
    cy.get('.button').should('have.text', 'Next: Availability').click()

    //2.Select availability
    cy.url().should('include','select-availability')
    cy.get('h1').should('contain','2. Availability')
    cy.get('h2').should('contain','Book your 1-to-1 Mentoring Call')
    cy.get('.description-text').type('please describe what help you need')

    //select date and time
    cy.get('button[class="date-picker-custom-input not-selected"]').click()
    cy.get('div[class="react-datepicker__month"]')
      .get('div').should('have.class', 'react-datepicker__day')
      .each(($el, index) => {
        if ($el.attr('aria-disabled') === 'false') {
          cy.wrap($el).click()
          console.log('found element')
          return false
        }
    })
    cy.get('.button-tertiary').click()
    
    //login with existing digitalboost account
    cy.get('div[class="login-container"]').get('button').contains('Login').click()
    cy.url().should('include','confirm-request')
    cy.get('h1').should('contain','Welcome back! Log in to your organisation account')
    cy.fixture('organisation-loginDetails').then((organisation)=>{
      organisationlogin.digitalBoostaccemail().type(organisation.email)
      organisationlogin.digitalBoostaccpwd().type(organisation.password)
    })
    cy.get('.button').contains('Login').click()

    //confirm request
    cy.url().should('include','confirm-request')
    cy.get('h1').should('contain','4. Confirm Request')
    cy.get('div[class="confirm-request__button-container"]')
    cy.get('.button-tertiary').should('have.text','Confirm Request').click()

    //request complete
    cy.url().should('include','request-complete')
    cy.get('h2').should('contain','Thank you,')
   
  })
})