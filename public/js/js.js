const singleForm = document.querySelector('#ind')
const singleButton = document.querySelector('.ind')
const importForm = document.querySelector('#import')
const importButton = document.querySelector('.imp')
const form = document.querySelector('form')

// document.addEventListener("visibilitychange", function() {
//     if (document.hidden){
//         location.reload()
//     }
// });

const ind = () => {
    singleForm.style.display = 'block'
    singleButton.style.background = '#333'
    singleButton.style.color = '#fff'
    importForm.style.display = 'none'
    importButton.style.background = '#eee'
    importButton.style.color = '#333'
     
}

const imp = () => {
    singleForm.style.display = 'none'
    singleButton.style.background = '#eee'
    singleButton.style.color = '#333'
    importForm.style.display = 'block'
    importButton.style.background = '#333'
    importButton.style.color = '#fff'
     
}

const report = () => {
    const startDate = document.querySelector('#startDate').value
    const endDate = document.querySelector('#endDate').value
    window.open(`/report?startDate=${startDate}&endDate=${endDate}`);
}

const checkData = () => {
    const startDate = document.querySelector('#startDate').value
    const endDate = document.querySelector('#endDate').value
    const formitug = document.querySelector('#formitug')
    const nuchmitug = document.querySelector('#Nuchmitug')
    const amount = document.querySelector('#amount')
    const totalFormitug = 0
    const totalNuchmitug = 0
    const totalAmount = 0

    fetch(`https://kollelsys.com/api/half/hour/61441012/${startDate}/${endDate}`).then((respons) => {
        respons.json().then((data) => {
            if (data.success == false ) {return}

            data.forEach(element => {
                totalFormitug += Number(element.TimesMorning)
                totalNuchmitug += Number(element.TimesAfternoon)
            });

            document.querySelector('#data').style.display = 'block'
            formitug.innerHTML = totalFormitug
            nuchmitug.innerHTML = totalNuchmitug



        })
    })

}

// importForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const startDate = document.querySelector('#startDate').value
//     const endDate = document.querySelector('#endDate').value
//     const report = document.querySelector('#report')

//     fetch('https://kollelsys.com/admin/reports/half/load?date_from='+ startDate +'&date_to=' + endDate).then((respons) => {
//         respons.json().then((data) => {
//             report.innerHtml = data

//         })
//     })
// })

