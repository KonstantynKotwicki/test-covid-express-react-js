module.exports = async (req, res) => {

    /* Get Statistics Request Handler
    # 1.    /
    # 2.    /?date=2020-08-02
    # 3.    /?dateFrom=2020-08-02
    # 4.    /?dateTo=2020-08-02
    # 5.    /?dateFrom=2020-08-02&dateTo=2020-08-02
    # 6.    /ru
    # 7.    /ru/?date=2020-08-02
    # 8.    /ru/?dateFrom=2020-08-02
    # 9.    /ru/?dateTo=2020-08-02
    # 10.   /ru/?dateFrom=2020-08-02&dateTo=2020-08-02
    */

    const dateFrom  = req.query.date || req.query.dateFrom
    const dateTo    = req.query.date || req.query.dateTo
    const country   = req.params.country

    const getStats = require("../utils/getStats")

    const responseHeader    = {controller: "getStats", url: req.originalUrl}
    const responseBody      = await getStats(dateFrom, dateTo, country)
    
    res.send(JSON.stringify({header: responseHeader, body: responseBody}))
}