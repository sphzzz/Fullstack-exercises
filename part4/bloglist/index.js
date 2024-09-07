const app = require('./app') // Import the Express app
const config = require('./utils/config') // Import configuration (port, MongoDB URL)
const logger = require('./utils/logger') // Import logging utilities

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
