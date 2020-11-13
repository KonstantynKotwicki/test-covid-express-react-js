exports.findStats = async function(dateFrom, dateTo, country) {

    const {model, getFilterLastUpdate, getFilterCountry} = require("../models/stats")

    return await model.find({...getFilterLastUpdate(dateFrom, dateTo), ...getFilterCountry(country)})
}

exports.upsertStat = async function(lastUpdate, country, cases, deaths, recovered) {

    const {model, getFilterLastUpdate, getFilterCountry} = require("../models/stats")

    const filter = {...getFilterLastUpdate(lastUpdate), ...getFilterCountry(country)}
    const stat = {"last_update": lastUpdate, "country": country, "cases": cases, "deaths": deaths, "recovered": recovered}
    
    return await model.findOneAndUpdate(filter, stat, {new: true, upsert: true})
}