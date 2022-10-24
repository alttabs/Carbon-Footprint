const el = require('./elements').ELEMENTS;

class Home {
  
  static accessHome(){
    cy.visit('https://www3.epa.gov/carbon-footprint-calculator/')
  }

  static initialFormEmptyValues(){
    cy.get(el.nOfPeopleInput).should('have.value', '')
    .get(el.zipCodeInput).should('have.value', '')
    .get(el.getStartedButton).click()
    .get(el.invalidNum).should('have.text', 'Please enter a valid number of people.')
    .get(el.invalidZipCode).should('have.text', 'Please enter a valid five-digit ZIP Code.')
  }

  static insertValueNofPeopleInput(value){
    cy.get(el.nOfPeopleInput).type(`${value}`).should('have.value', `${value}`)
  }

  static insertZipcodeInput(value){
    cy.get(el.zipCodeInput).type(`${value}`).should('have.value', `${value}`)
  }

  static getStartedButton(){
    cy.get(el.getStartedButton).click()
  }

  static getInvalidNum(){
    cy.get(el.invalidNum).should('have.text', 'Please enter a valid number of people.')

  }

  static getInvalidZip(){
    cy.get(el.invalidZip, {timeout: 10000}).should('be.visible')
  }

  static checkDefaultZip(){
    cy.get(el.defaultZip).check()
  }

  static getInvalidZipCodeError(){
    cy.get(el.invalidZipCode).should('have.text', 'Please enter a valid five-digit ZIP Code.')
  }

  static verifyHomeEnergySection(){
    cy.get(el.sectionName).should('have.text', 'Home Energy')
  }

  static downloadSpredsheetCalculator() {
    cy.get(el.downloadButton).should('be.visible')
    .click()
    .readFile('cypress/downloads/GHGCalculator.xls', { timeout: 10000})
    .should('exist')
  }

  static getHeaderInfo(){
    cy.get(el.houseCarbonHeader, {timeout: 10000}).should('have.text', 'Household Carbon Footprint Calculator')
  }

  static fillCalculatorForm(){
    cy.get(el.primaryHeatingSource, {timeout: 10000}).select('Electricity')
      .get(el.naturalGasTextInput).type('61.68').should('have.value', '61.68')
      .get(el.electricityTextInput).type('117.46').should('have.value', '117.46')
      .get(el.fuelTextInput).type('0').should('have.value', '0')
      .get(el.propaneTextInput).type('0').should('have.value', '0')

      //Reduce emissions Section
      .get(el.energyAC).type('41').should('have.value', '41')
      .get(el.energyHeat).type('37.4').should('have.value', '37.4') //using comma instead of dot will change result
      .get(el.lightsToReplace).type('7').should('have.value', '7')
      .get(el.pwrMgmtSelect).select('Already Done')
      .get(el.increaseGreenInput).type('30').should('have.value', '30')
      .get(el.coldWaterSelect).select('Already Done')
      .get(el.loadsPerWeek).type('3').should('have.value', '3')
      .get(el.AirDrySelect).select('Will Do')
      .get(el.percentageAirDrySelect).select('20% of my Laundry')
      .get(el.fridgeSelect).select('Already Done')
      .get(el.furnaceSelect).select('Will Do')
      .get(el.windowSelect).select('Will Not Do')
      .get(el.toTransportation).click()

      //Transportation Section
     .get(el.numVehiclesInput).select('1')
     .get(el.maintCurrentSelect).select('Already Done')
     .get(el.vehicle1Miles).type('46.6').should('have.value', '46.6')
     .get(el.vehicle1Select).select('Per Week')
     .get(el.vehicle1GasMileage).type('8.6')
     .get(el.reduceMilesInput1).should('have.value', '')
     .get(el.replaceVehicleInput1).should('have.value', '')
     .get(el.toWaste).click() 

     //Wast Section
     .get(el.aluminumCheckbox).check()
     .get(el.plasticCheckbox).check()
     .get(el.glassCheckbox).check()
     .get(el.newspaperCheckboxR).should('be.visible')
     .get(el.newspaperCheckboxR).should('be.visible')
     .get(el.glassCheckboxR).should('not.be.visible')
     .get(el.plasticCheckboxR).should('not.be.visible')
     .get(el.aluminumCheckboxR).should('not.be.visible')

     .get(el.toReport).click()
  }

  static validateReport(){
      cy.get(el.homeEnergyProgressBar).should('have.value', 100)
     .get(el.transportationProgressBar).should('have.value', 50)
     .get(el.wasteProgressBar).should('have.value', 50)
     .get(el.printicon).should('be.visible')
     .get(el.homeKey).should('be.checked')
     .get(el.transKey).should('be.checked')
     .get(el.wasteKey).should('be.checked')
     .get(el.openSharePanel).should('be.visible')
     .get(el.plannedActions).should('have.text', 'Your Planned Actions Are Equal to:')
     .get(el.gallons).should('have.text', '565 gallons of gas')
     .get(el.trees).should('have.text', '128 trees')
     .get(el.wast).should('have.text', '3,577 tons of waste')
  }



}
module.exports = Home;