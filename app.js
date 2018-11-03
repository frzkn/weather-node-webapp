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
    let iconUrl = 'http://openweathermap.org/img/w/'+weathers.weather[0].icon+'.png'
    return res.render('index',{ weathertext:weathers, error: null , iconUrl}) }
}})

})

app.listen(1337, function(){
  console.log('server is up and running')
})

