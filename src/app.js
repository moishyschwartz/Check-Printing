const path = require('path')
const express = require('express')
const hbs = require('hbs')
const dollarsToWords = require('dollars-to-words')
const { format } = require('number-currency-format-2')
const capitalize = require('capitalize')
const goodDate = require('./utills/convarters')
const dataToCheck = require('./utills/import')
const report = require('./utills/report')

const app = express()

const port = process.env.PORT || 3000

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
        amountWriten: capitalize.words(dollarsToWords(amouont)),
        memo,
    })
})

app.get('/import', (req, res) => {
    const {startDate, endDate} = req.query
    if (startDate > endDate || startDate == ""){
        return res.send('<p> Error! Make sure that bote dates are filled and the start date are befor the end date <a href = "/"> Back </a> </p>')
    }
    dataToCheck(startDate, endDate, (error, response) => {
        if (error) {
            return res.status(400).send(error)
         }
        res.render('import-print',{
            data:response
        })
    })

})

app.get('/report', (req, res) => {
    const {startDate, endDate} = req.query
    if (startDate > endDate || startDate == ""){
        return res.send('<p> Error! Make sure that bote dates are filled and the start date are befor the end date <a href = "/"> Back </a> </p>')
    }

    report(startDate, endDate, (error, response) => {
        if (error) {
           return res.status(400).send(error)
        }
        res.render('import-print', {
            data:response
        })
    })
})

app.get('/*', (req, res) => {
    res.send('Error 404')
})

app.listen(port, () =>{
    console.log('Server is up un port ', port)
})