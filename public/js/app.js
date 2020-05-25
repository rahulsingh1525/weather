//import { response } from "express"

console.log("client side java script  is loaded")
console.log("Hi")
fetch("http://puzzle.mead.io/puzzle").then((response) =>{
    response.json().then((data) =>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value
    url = "/weather?address="+location
    messageOne.textContent = 'Loading'
    fetch(url).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
            return messageOne.textContent = data.error    
            //return console.log(data.error)
            }
            else{
                messageOne.textContent =  data.forecast
            }
        })
    })

})