/// <reference types="cypress" />

context('Carbon Foortprint Calculator', () => {
  beforeEach(() => {
    cy.visit('https://www3.epa.gov/carbon-footprint-calculator/')
  })

  it('Form should not accept empty number of People  and empty Zip Code', () => {
    cy.get('#ppl-in-household-input')
      .should('have.value', '')
      .get('#zip-code-input')
      .should('have.value', '')
      .get('#get-started').click()
      .get('#invalidNum').should('have.text', 'Please enter a valid number of people.')
      .get('#invalidZipNum').should('have.text', 'Please enter a valid five-digit ZIP Code.')
  })

  it('Form should not accept invalid Zip Code', () => {
    cy.get('#ppl-in-household-input')
      .type('1').should('have.value', '1')
      .get('#zip-code-input')
      .type('1234').should('have.value', '1234')
      .get('#get-started').click()

      .get('#invalidZipNum').should('have.text', 'Please enter a valid five-digit ZIP Code.')
  })

  it('Form should not accept invalid number of people', () => {
    cy.get('#ppl-in-household-input')
      .type('-1').should('have.value', '-1')
      .get('#zip-code-input')
      .type('12345').should('have.value', '12345')
      .get('#get-started').click()
      .get('#invalidNum').should('have.text', 'Please enter a valid number of people.')
  })

    it('Form should not accept invalid Zip Code and suggest a default zip code', () => {
    cy.get('#ppl-in-household-input')
      .type('1').should('have.value', '1')
      .get('#zip-code-input')
      .type('11111').should('have.value', '11111')
      .get('#get-started').click()
      .get('#invalidZip', {timeout: 10000}).should('be.visible')
      .get('.default-zip').check()
      .get('#get-started').click()
      .get('.sectionName').should('have.text', 'Home Energy')
  })

  it('Should Download Excell Calculator', () => {
    cy.get('li > button').should('be.visible')
    .click()
    .readFile('cypress/downloads/GHGCalculator.xls', { timeout: 10000})
    .should('exist')

  })

  it('Form Should Redirect when inform valid input', () => {
    cy.get('#ppl-in-household-input')
      .type('1').should('have.value', '1')
      .get('#zip-code-input')
      .type('32819').should('have.value', '32819')
      .get('#get-started').click()
      .get('.eps-header-info > h2', {timeout: 1000}).should('have.text', 'Household Carbon Footprint Calculator')

      //HomeEnergy Section
      .get('#primaryHeatingSource').select('Electricity')
      .get('#naturalGasTextInput').type('61.68').should('have.value', '61.68')
      .get('#electricityTextInput').type('117.46').should('have.value', '117.46')
      .get('#fuelTextInput').type('0').should('have.value', '0')
      .get('#propaneTextInput').type('0').should('have.value', '0')
      .get('#fuelTextInput').should('have.value', '0')
      .get('#propaneTextInput').should('be.visible')

      //Reduce emissions Section
      .get('#energyAC').type('41').should('have.value', '41')
      .get('#energyHeat').type('37.4').should('have.value', '37.4') //using comma instead of dot will change result
      .get('#lightsToReplace').type('7').should('have.value', '7')
      .get('#pwrMgmtSelect').select('Already Done')
      .get('#increaseGreenInput').type('30').should('have.value', '30')
      .get('#coldWaterSelect').select('Already Done')
      .get('#loadsPerWeek').type('3').should('have.value', '3')
      .get('#AirDrySelect').select('Will Do')
      .get('#percentageAirDrySelect').select('20% of my Laundry')
      .get('#fridgeSelect').select('Already Done')
      .get('#furnaceSelect').select('Will Do')
      .get('#windowSelect').select('Will Not Do')
      .get('#to-transportation').click()

      //Transportation Section
     .get('#numVehiclesInput').select('1')
     .get('#maintCurrentSelect').select('Already Done')
     .get('#vehicle1Miles').type('46.6').should('have.value', '46.6')
     .get('#vehicle1Select').select('Per Week')
     .get('#vehicle1GasMileage').type('8.6')
     .get('#reduceMilesInput1').should('have.value', '')
     .get('#replaceVehicleInput1').should('have.value', '')
     .get('#to-waste').click() 

     //Wast Section
     .get('#aluminumCheckbox').check()
     .get('#plasticCheckbox').check()
     .get('#glassCheckbox').check()
     .get('#newspaperCheckboxR').should('be.visible')
     .get('#newspaperCheckboxR').should('be.visible')
     .get('#glassCheckboxR').should('not.be.visible')
     .get('#plasticCheckboxR').should('not.be.visible')
     .get('#aluminumCheckboxR').should('not.be.visible')

     .get('#to-report').click()
  
     .get('#homeEnergyProgressBar').should('have.value', 100)
     .get('#transportationProgressBar').should('have.value', 50)
     .get('#wasteProgressBar').should('have.value', 50)
     .get('#printicon').should('be.visible')
     .get('#homeKey').should('be.checked')
     .get('#transKey').should('be.checked')
     .get('#wasteKey').should('be.checked')
     .get('#openSharePanel').should('be.visible')
     .get('#planned-actions > h2').should('have.text', 'Your Planned Actions Are Equal to:')
     .get('#plannedList > :nth-child(1) > div').should('have.text', '565 gallons of gas')
     .get('#plannedList > :nth-child(3) > div').should('have.text', '128 trees')
     .get('#plannedList > :nth-child(5) > div').should('have.text', '3,577 tons of waste')
  })
})
