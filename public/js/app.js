//this files runs client-side javascript

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data) //inspect with console dev tools
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input') //whatever we enter in the search box
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    //preventDefault stops the browser to refresh
    e.preventDefault()

    const location = search.value
    const weatherURL = '/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(weatherURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    console.log(location)
})