import 'cypress-mochawesome-reporter/register'
import './commands'

const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()
