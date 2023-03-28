const cityNameHTML = document.getElementById("city-name")
const humidityHTML = document.getElementById("humidity")
const tempHTML = document.getElementById("temp")
const tempMinHTML = document.getElementById("temp-min")
const tempMaxHTML = document.getElementById("temp-max")
const feelsLikeHTML = document.getElementById("feels-like")
const form = document.getElementById("city-form")
const key = "6b90e7ed6704a9984fc25f85e2580025"
const url = new URL("http://api.openweathermap.org/data/2.5/weather?")

navigator.geolocation.getCurrentPosition(position=> {
    const {
        latitude,
        longitude
    } = position.coords;
    
    getLocation(latitude, longitude)
}, ()=> {
    console.log("error")
})

async function callWeather(query){

    url.searchParams.set('q',query)
    url.searchParams.set('units','imperial')
    url.searchParams.set('id', '524901')
    url.searchParams.set('appid',key)

    const res = await fetch(url)
    const data = await res.json()
    console.log(data.main)

    const {temp, feels_like, temp_min, temp_max, pressure, humidity} = data.main

    cityNameHTML.textContent = data.name
    tempHTML.textContent = temp
    feelsLikeHTML.textContent = feels_like
    tempMinHTML.textContent = temp_min
    tempMaxHTML.textContent = temp_max
    humidityHTML.textContent = humidity
    
    console.log(data)
    return data
}

async function getLocation(lat, lon){
    const revQuery = new URL(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${key}`)

    const res = await fetch(revQuery);
    const data = await res.json();
    await callWeather(data[0].name)
}


form.addEventListener("submit", e => {
    e.preventDefault()
    const query = e.target[0].value
    callWeather(query)
})

