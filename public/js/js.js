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

