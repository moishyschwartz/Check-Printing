const singleForm = document.querySelector('#ind')
const singleButton = document.querySelector('.ind')
const importForm = document.querySelector('#import')
const importButton = document.querySelector('.imp')
const form = document.querySelector('form')

document.addEventListener("visibilitychange", function() {
    if (document.hidden){
        location.reload()
    }
});

const ind = () => {
    singleForm.style.display = 'block'
    singleButton.style.background = '#2fc85d'
    importForm.style.display = 'none'
    importButton.style.background = '#eee'
     
}

const imp = () => {
    singleForm.style.display = 'none'
    singleButton.style.background = '#eee'
    importForm.style.display = 'block'
    importButton.style.background = '#2fc85d'
     
}

