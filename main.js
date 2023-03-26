console.log("hello world")


const key = "6b90e7ed6704a9984fc25f85e2580025"
const query = "chicago"



const url = new URL("http://api.openweathermap.org/data/2.5/weather?")
url.searchParams.set('q',query)
url.searchParams.set('units','imperial')
url.searchParams.set('id', '524901')
url.searchParams.set('appid',key)


const cityNameHTML = document.getElementById("cityName")
const humidityHTML = document.getElementById("humidity")
const tempHTML = document.getElementById("temp")
const tempMinHTML = document.getElementById("temp-min")
const tempMaxHTML = document.getElementById("temp-max")
const feelsLikeHTML = document.getElementById("feels-like")

async function callWeather(){
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.main)

    const {temp, feels_like, temp_min, temp_max, pressure, humidity} = data.main
    tempHTML.textContent = temp
    feelsLikeHTML.textContent = feels_like
    tempMinHTML.textContent = temp_min
    tempMaxHTML.textContent = temp_max
    humidityHTML.textContent = humidity
    
    return data
}



console.log(callWeather())
