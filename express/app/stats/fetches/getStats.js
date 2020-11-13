module.exports = getStats = async function(date, country) {

    const url = "https://covid19-api.org/api/status/".concat(!!country ? country : "").concat(!!date ? "?date=".concat(date) : "")

    const fetch = require("node-fetch") 

    const response = await fetch(url)

    if(response.ok) return response.json()
}