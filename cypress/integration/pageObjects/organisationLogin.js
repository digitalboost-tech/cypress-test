class organisationLogin{
    digitalBoostaccemail(){
        return cy.get('input[type="text"]')        
    }
    
    digitalBoostaccpwd(){
        return cy.get('input[type="password"]')
    }
}
export default organisationLogin