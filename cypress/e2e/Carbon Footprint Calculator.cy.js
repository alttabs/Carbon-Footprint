/// <reference types="cypress" />
// import Home from '../support/pages/Calculator'
const Home = require('./../support/pages/Calculator/index.js');

context('Carbon Foortprint Calculator', () => {

  it('Form should not accept empty number of People and empty Zip Code', () => {
    Home.accessHome()
    Home.initialFormEmptyValues()
  })

  it('Form should not accept invalid Zip Code', () => {
    Home.accessHome()
    Home.insertValueNofPeopleInput(1)
    Home.insertZipcodeInput(1234)
    Home.getStartedButton()
    Home.getInvalidZipCodeError()
  })

  xit('Form should not accept invalid number of people', () => {
    Home.accessHome()
    Home.insertValueNofPeopleInput(-1)
    Home.insertZipcodeInput(12345)
    Home.getStartedButton()
    Home.getInvalidNum()
  })

  it('Form should not accept invalid Zip Code and suggest a default zip code', () => {
    Home.accessHome()
    Home.insertValueNofPeopleInput(1)
    Home.insertZipcodeInput(11111)
    Home.getStartedButton()
    Home.getInvalidZip()
    Home.checkDefaultZip()
    Home.getStartedButton()
    Home.verifyHomeEnergySection()
  })

  it('Should Download Excell Calculator', () => {
    Home.downloadSpredsheetCalculator()
  })

  it('Form Should Redirect when inform valid input', () => {
    Home.accessHome()
    Home.insertValueNofPeopleInput(1)
    Home.insertZipcodeInput(32819)
    Home.getStartedButton()
    Home.fillCalculatorForm()
    Home.validateReport()
  })
})
