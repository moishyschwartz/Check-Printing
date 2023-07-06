const path = require('path')
const express = require('express')
const hbs = require('hbs')
const dollarsToWords = require('dollars-to-words')
const { format } = require('number-currency-format-2')
const goodDate = require('./utills/convarters')

const app = express()

// Define File Pathes for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlbars engine and  views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/print', (req, res) => {
    const {payee, amouont, memo} = req.query
    if (isNaN(amouont)) {
        return res.send('<script>alert("Amount must be a number"); location.href = "/"</script>')
    }
    res.render('print', {
        date: goodDate(),
        payee,
        amouont: format(amouont),
        amountWriten: dollarsToWords(amouont),
        memo,
    })
})

app.get('/import', (req, res) => {
    const {startDate, endDate} = req.query
    if (startDate > endDate){
        return res.send('unspurted')
    }
    res.send(startDate + endDate)

})

app.get('/*', (req, res) => {
    res.send('Error 404')
})

app.listen(2000, () =>{
    console.log('Server is up un port 2000')
})