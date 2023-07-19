const request = require("postman-request");
const dollarsToWords = require("dollars-to-words");
const { format } = require("number-currency-format-2");
const capitalize = require("capitalize");
const {goodDate, margeArr} = require("./convarters");
const { toJewishDate, formatJewishDateInHebrew } = require("jewish-date");

const dataToCheck = (startDate, endDate, callback) => {
  const a = new Date(startDate);
  a.setDate(a.getDate());
  const b = new Date(endDate);
  b.setDate(b.getDate());
  const jewishStartDate = toJewishDate(a);
  const jewishEndDate = toJewishDate(new Date(b));
  const url = `https://kollelsys.com/api/half/hour/61441012/${startDate}/${endDate}/`;
  request({ url, json: true }, (error, response) => {
    if (error || response.body.success == false || response.body.msg) {
      return callback("Invalid Dates");
    }

    let data = "";
    let counter = 0;
    let clas = "";
    let memo = "";
    const marged = margeArr(response.body.half_hour);
    marged.forEach((element) => {
      const { first_name, last_name, TimesMorning, TimesAfternoon } = element;
      const amount = TimesMorning * 20 + TimesAfternoon * 10;
      if (counter == 0) {
        clas = "outside1";
      } else {
        clas = "outside";
      }
      
      data += `<div id="outside" class="${clas}">
            <div id="date" class="date"> ${goodDate()} </div>
            <div id="payTo" class="payTo"> ${first_name} ${last_name} </div>
            <div id="amountWrith" class="amountWrith"> ${capitalize.words(
              dollarsToWords(amount)
            )}*** </div>
            <div id="amount" class="amount"> ${format(amount)}*** </div>
            <div id="memo" class="memo"> ${formatJewishDateInHebrew(
              jewishStartDate
            )} - ${formatJewishDateInHebrew(
        jewishEndDate
      )} <br/>  פארמיטאג ${Number(TimesMorning)}  ${TimesMorning == 1 ?  "סדר" : "סדרים"}  <br/> נאכמיטאג ${Number(TimesAfternoon)} ${TimesAfternoon == 1 ?  "סדר" : "סדרים"}</div>
          </div>`;
      if (counter < 2) {
        counter++;
      } else {
        counter = 0;
        data += '<div class= "fill" >  </div>';
      }
    });
    callback(undefined, data);
  });
};
dataToCheck("2023-07-10", "2023-07-20", () => {});
module.exports = dataToCheck;
