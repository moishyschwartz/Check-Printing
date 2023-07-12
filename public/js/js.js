const singleForm = document.querySelector("#ind");
const singleButton = document.querySelector(".ind");
const importForm = document.querySelector("#import");
const importButton = document.querySelector(".imp");
const form = document.querySelector("form");

const ind = () => {
  singleForm.style.display = "block";
  singleButton.style.background = "#333";
  singleButton.style.color = "#fff";
  importForm.style.display = "none";
  importButton.style.background = "#eee";
  importButton.style.color = "#333";
};

const imp = () => {
  singleForm.style.display = "none";
  singleButton.style.background = "#eee";
  singleButton.style.color = "#333";
  importForm.style.display = "block";
  importButton.style.background = "#333";
  importButton.style.color = "#fff";
};

const report = () => {
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;
  window.open(`/report?startDate=${startDate}&endDate=${endDate}`);
};

const checkData = () => {
  document.querySelector("#data").style.display = "none";
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;
  const formitug = document.querySelector("#formitug");
  const nuchmitug = document.querySelector("#Nuchmitug");
  const amount = document.querySelector("#totalAmount");
  let totalFormitug = 0;
  let totalNuchmitug = 0;
  let totalAmount = 0;

  fetch(
    `https://kollelsys.com/api/half/hour/61441012/${startDate}/${endDate}`
  ).then((respons) => {
    respons.json().then((data) => {
      if (data.success == false) {
        return;
      }

      data.half_hour.forEach((element) => {
        totalFormitug += Number(element.TimesMorning);
        totalNuchmitug += Number(element.TimesAfternoon);
      });

      document.querySelector("#data").style.display = "block";
      checks.innerHTML = " " + data.half_hour.length;
      const total = totalFormitug * 20 + totalNuchmitug * 10;
      amount.innerHTML = " " + total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    });
  });
};
