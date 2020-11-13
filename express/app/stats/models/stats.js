const mongoose = require("mongoose")

exports.model = mongoose.model("Stat", 
    
    new mongoose.Schema({
        
        country:        String,
        last_update:    Date,
        cases:          Number,
        deaths:         Number,
        recovered:      Number
    })
)

exports.getFilterLastUpdate = function(lastUpdateFrom, lastUpdateTo) {

    const moment = require("moment")

    return {
        
        last_update: {

            $gte: moment(!!lastUpdateFrom ? lastUpdateFrom : undefined).toISOString(true), 
            $lte: moment(!!lastUpdateTo ? lastUpdateTo : undefined).add(1, "days").toISOString(true)
        }
    }
}

exports.getFilterCountry = function(country) {

    return !!country ? {country: {$in: country.toUpperCase().split(",")}} : {}
}