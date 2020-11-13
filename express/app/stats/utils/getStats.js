module.exports = getStats = async function(dateFrom, dateTo, country) {

    const {findStats, upsertStat} = require("../actions/stats")

    let stats = await findStats(dateFrom, dateTo, country)

    if(stats.length == 0) {
        
        stats = await fetchStats(dateFrom, dateTo, country)

        stats.forEach(stat => upsertStat(stat.last_update, stat.country, stat.cases, stat.deaths, stat.recovered))

    } else {

        const moment = require("moment")

        const dates         = Array.from({length: moment(dateTo).diff(moment(dateFrom), "days") + 1}, (e, i) => moment(dateFrom).add(i, "days").format("YYYY-MM-DD"))
        const statDates     = stats.map(stat => moment(stat.last_update).format("YYYY-MM-DD"))
        const missedDates   = dates.filter(date => !statDates.find(statDate => statDate == date)).sort((a, b) => moment(a).format("YYYY-MM-DD") - moment(b).format("YYYY-MM-DD"))

        if(missedDates.length != 0) {
            
            const missedStats = await fetchStats(missedDates[0], missedDates[missedDates.length - 1], country)

            missedStats.forEach(stat => upsertStat(stat.last_update, stat.country, stat.cases, stat.deaths, stat.recovered))
            
            stats = stats.concat(missedStats)
        }
    }

    return stats
}

async function fetchStats(dateFrom, dateTo, country) {

    const moment    = require("moment")
    const getStats  = require("../fetches/getStats")

    let stats = !dateFrom || !dateTo ? await getStats(dateFrom || dateTo, country) : await Promise.all(Array.from({length: moment(dateTo).diff(moment(dateFrom), "days") + 1}, (e, i) => {
        
        return new Promise(async(resolve, reject) => {

            resolve(await getStats(moment(dateFrom).add(i, "days").format("YYYY-MM-DD"), country))
        })

    }))

    stats = Array.isArray(stats) ? stats : Array.from([stats])

    return stats.filter(stat => !!stat)
}