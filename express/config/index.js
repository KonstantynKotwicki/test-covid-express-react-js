const nconf = require("nconf")

const env = nconf.env().get("NODE_ENV")

const path = require("path")

const config = nconf.argv().env().file({file: path.join(__dirname, env + ".json")})

module.exports = {

    serverPort: config.get("server:port"),
    serverHost: config.get("server:host"),
    mongoURI: config.get("mongo:uri"),
    env: env
}