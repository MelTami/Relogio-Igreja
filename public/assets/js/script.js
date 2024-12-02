const hoursElement   = document.getElementById('hours')
const minutesElement = document.getElementById('minutes')
const secondsElement = document.getElementById('seconds')
const dateElement   = document.getElementById('date')
const monthElement = document.getElementById('month')
const yearElement = document.getElementById('year')


function fixTime(time){
    return time < 10 ? '0'+time : time
}

function newTime(){
    const date    = new Date()
    const hours   = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const day     = date.getDate()
    const month   = date.getMonth() + 1
    const year = date.getFullYear()
    
    hoursElement.textContent   = fixTime(hours)
    minutesElement.textContent = fixTime(minutes)
    secondsElement.textContent = fixTime(seconds)
    dateElement.textContent   = fixTime(day)
    monthElement.textContent = fixTime(month)
    yearElement.textContent = fixTime(year)
}

newTime()
setInterval(newTime, 1000)