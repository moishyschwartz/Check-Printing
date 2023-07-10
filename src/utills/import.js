const request = require('postman-request')
const dollarsToWords = require('dollars-to-words')
const { format } = require('number-currency-format-2')
const capitalize = require('capitalize')
const goodDate = require('./convarters')

const dataToCheck = (startDate, endDate, callback) => {
    const url = 'https://kollelsys.com/admin/reports/half/load?date_from='+ startDate +'&date_to=' + endDate
    request({url, json:true}, (error, response) => {
        if (error) {
            return callback(error)
        } console.log(response.body)

        // const response = [
        //   {
        //     first_name: "fghj",
        //     last_name: "fgh",
        //     TimesMorning: 2,
        //     TimesAfternoon: 3,
        //   },
        //   {
        //     first_name: "fghj",
        //     last_name: "fgh",
        //     TimesMorning: 2,
        //     TimesAfternoon: 3,
        //   },
        //   {
        //     first_name: "fghj",
        //     last_name: "fgh",
        //     TimesMorning: 8,
        //     TimesAfternoon: 5,
        //   },
        //   {
        //     first_name: "fghj",
        //     last_name: "fgh",
        //     TimesMorning: 2,
        //     TimesAfternoon: 3,
        //   }
        // ];


        let data = ''
        let counter = 0
        let clas = ""
        response.forEach(element => {
            const {first_name, last_name, TimesMorning, TimesAfternoon} = element
            const amount = TimesMorning*20 + TimesAfternoon*10
            if (counter == 0) {
              clas = 'outside1'
            } else {
              clas = 'outside'
            }
            
            data += 
            `<div id="outside" class="${clas}">
            <div id="date" class="date"> ${goodDate()} </div>
            <div id="payTo" class="payTo"> ${first_name} ${last_name} </div>
            <div id="amountWrith" class="amountWrith"> ${capitalize.words(dollarsToWords(amount))}*** </div>
            <div id="amount" class="amount"> ${format(amount)}*** </div>
            <div id="memo" class="memo"> Morning ${TimesMorning} Days <br> Afternone ${TimesAfternoon} Days  </div>
          </div>`
          if (counter < 2){
            counter++
          } else {
            counter = 0
            data += '<div class= "fill" >  </div>'
          } 
          

        
        });
        callback(undefined, data)
    })
}

module.exports = dataToCheck