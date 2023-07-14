const request = require('postman-request');
const { margeArr } = require('./convarters');




const report = (startDate, endDate, callback) => {
  const url = `https://kollelsys.com/api/half/hour/61441012/${startDate}/${endDate}/`;
  request({ url, json: true }, (error, response) => { 
    if (error || response.body.success == false || response.body.msg) {
      return callback('Invalid Dates')
    } 
    let data = `<div class='outsideReport row'> <div class='header'> <p class="count"> </p><p class='name'>Name</p><p> Amount</p><p>Morning</p><p>Afternoon</p><p class="paid">Paid </p> </div>`
    let counter = 1
    const margedArray = margeArr(response.body.half_hour)
    margedArray.forEach((element) => {
        const {first_name, last_name, TimesMorning, TimesAfternoon} = element
      data += `<div class="row"><p class="count">${counter}</p><p class='name'>${first_name} ${last_name}</p><p>$ ${TimesMorning * 20 + TimesAfternoon * 10}</p><p>${TimesMorning}</p><p>${TimesAfternoon}</p><p class="paid">Paid <input type='radio'></p></div>`;
      counter++
    })
    data += '</div>'
    callback(undefined, data)
  });
};

module.exports = report