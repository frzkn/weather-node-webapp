const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
   res.render('index', { weathertext: null, error: 'Error'})
})

app.post('/',function(req, res) {
 let apiKey = '4134065bab0fbb02fb5f84220ada9492'
 let city = req.body.citytext || 'thane'
 let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`

request(url,function (err,response,body) {
  if(err)
    return res.render('index', { weathertext: null, error: 'Error'})
  else {
    let weathers = JSON.parse(body)
    if (weathers.main == undefined)
       return res.render('index', { weathertext: null, error: 'Error'})
    else {
    console.log(weathers)
    weathers.main.temp = Math.round(weathers.main.temp)
    const weatherId = weathers.weather[0].id
    let iconName = ''
     switch (true) {
      case (weatherId < 300):
        iconName= 'wi-thunderstorm.svg'
        break
      case (weatherId < 350):
        iconName= 'wi-rain.svg'
        break
      case (weatherId < 550):
        iconName= 'wi-day-showers.svg'
        break
      case (weatherId < 650):
        iconName= 'wi-day-snow.svg'
        break
      case (weatherId < 790):
        iconName= 'wi-windy.svg'
        break
      case (weatherId == 800):
        iconName= 'wi-day-sunny.svg'
        break
      default:
        iconName= 'wi-cloud.svg'
     }

    iconUrl = '/images/'+iconName
    // let iconUrl = 'http://openweathermap.org/img/w/'+weathers.weather[0].icon+'.png'
    return res.render('index',{ weathertext:weathers, error: null , iconUrl}) }
}})

})

const PORT = process.env.PORT || 1337

app.listen(PORT, function(){
  console.log('server is up and running')
})

