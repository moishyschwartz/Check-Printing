const request = require('postman-request')



const report = (startDate, endDate, callback) => {
  const url = `https://kollelsys.com/api/half/hour/61441012/${startDate}/${endDate}/`;
  request({ url, json: true }, (error, response) => {
    let data = "<div class='outsideReport'>";
    let counter = 1

    response.body.half_hour.forEach((element) => {
        const {first_name, last_name, TimesMorning, TimesAfternoon} = element
      data += `<div class="row"><p class="count">${counter}</p><p class='name'>${first_name} ${last_name}</p><p>$ ${TimesMorning * 20 + TimesAfternoon * 10}</p><p>${TimesMorning}</p><p>${TimesAfternoon}</p><p class="paid">Paid <input type='radio'></p></div>`;
      counter++
    })
    data += '</div>'
    callback(undefined, data)
  });
};

module.exports = report