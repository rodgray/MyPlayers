
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {player: null, error: null});
})
app.post('/', function (req, res) {

  res.render('index');

  var playerName = req.body.player;
  var newPlayer = playerName.replace(" ", "-");
  request(`https://api.mysportsfeeds.com/v1.2/pull/nba/2016-2017-regular/active_players.json/?player=${newPlayer}`, (error, response, body) => {
    if (error) {

      console.log('Error:', err);
    }
    else {

      if (response.statusCode === '400') {

        console.log('Error try again');
      }
      else {
      //  var favoritePlayer = `Your favorite player ${body.activeplayers.playerentry.firstName} ${body.activeplayers.playerentry.LastName} plays for the ${body.activeplayers.playerentry.team.City} ${body.activeplayers.playerentry.team.Name}`;

        console.log(body);
      //  res.render('index', {player: favoritePlayer, error:null});
      }
    }


  })
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
