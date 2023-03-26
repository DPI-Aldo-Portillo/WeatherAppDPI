console.log("hello world")


const key = "6b90e7ed6704a9984fc25f85e2580025"
const query = "Chicago"

const api = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&forecast?id=524901&appid=${key}`

async function callWeather(){
    const res = await fetch(api)
    const data = await res.json()
    console.log(data)
    return data
}

console.log(callWeather())
