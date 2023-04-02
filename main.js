const cityNameHTML = document.getElementById("city-name")
const humidityHTML = document.getElementById("humidity")
const tempHTML = document.getElementById("temp")
const tempMinHTML = document.getElementById("temp-min")
const tempMaxHTML = document.getElementById("temp-max")
const feelsLikeHTML = document.getElementById("feels-like")
const arrowHTML = document.getElementById("arrow")
const windSpeedHTML = document.getElementById("windspeed")
const pressureHTML = document.getElementById("pressure")
const form = document.getElementById("city-form")
const quote = document.getElementById("text")
const author = document.getElementById("author")
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

    const [weatherRes, quoteRes] = await Promise.all([
        fetch(url),
        fetch("https://type.fit/api/quotes")
    ])

    
    const quoteData = await quoteRes.json()
    const weatherData = await weatherRes.json()

    //console.log(quoteData)
    //console.log(weatherData)

    //Modify Weather
    const {temp, feels_like, temp_min, temp_max, pressure, humidity} = weatherData.main

    cityNameHTML.textContent = weatherData.name
    tempHTML.textContent = temp
    feelsLikeHTML.textContent = feels_like
    tempMinHTML.textContent = temp_min
    tempMaxHTML.textContent = temp_max
    humidityHTML.textContent = humidity
    pressureHTML.textContent = pressure

    const {speed, deg} = weatherData.wind

    arrowHTML.style.transform = `rotate(${-135 + deg}deg)`
    windSpeedHTML.textContent = speed;

    //Modify Quote

    const index = Math.floor(Math.random() * quoteData.length)

    quote.textContent = quoteData[index].text
    author.textContent = quoteData[index].author

    return [weatherData, quoteData]
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
