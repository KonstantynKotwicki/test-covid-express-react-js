const mongoose  = require("mongoose")
const mongoURI  = require("./config").mongoURI

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("connected", () => {

    console.log("Mongo has been connected ...")

    CreateServer()
})

function CreateServer() {

    const config = require("./config")

    const host  = config.serverHost
    const port  = config.serverPort
    const env   = config.env

    const http  = require("http")
    const https = require("https")
    const app   = require("./app")

    const server = env == "production" ? https.createServer(app) : http.createServer(app)

    server.listen(port, host, () => {
    
        console.log(`Application has been started on ${env == "production" ? "https": "http"}://${host}:${port}`)

        if(process.platform === "win32") {

            const readline = require("readline")

            readline.createInterface({input: process.stdin, output: process.stdout}).on("SIGINT", () => process.emit("SIGINT"))
        }
      
        process.on("SIGINT", () => {
    
            mongoose.connection.close(() => {

                console.log("Mongo has been disconnected ...")
    
                process.exit(0)
            })
        })
    })
}