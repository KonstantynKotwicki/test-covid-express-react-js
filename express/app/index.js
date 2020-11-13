const express = require("express")

const app = express()

app.get("/", (req, res) => {

    res.send(200, `<h1>Hello, World</h1>`)
})

app.use((err, req, res, next) => {

    res.send(500, `Woops ... Server send ${err}`)
})

app.use("/stats", require("./stats"))

app.use((req, res) => {

    res.send(404, `Woops ... The requested page ${req.originalUrl} was not found`)
})

setInterval(async() => {

    const getStats = require("./stats/fetches/getStats")

    const stats = await getStats()

    if(stats.length != 0) {

        const {upsertStat} = require("./stats/actions/stats")

        stats.forEach(stat => upsertStat(stat.last_update, stat.country, stat.cases, stat.deaths, stat.recovered))
    }
    
}, 60000)

module.exports = app