const express = require('express');
const app = express();
const cors = require('cors');
const sql = require("mssql");

// test stuff
const qs = require('querystring');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})
 
// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})





const port = process.env.PORT;

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER, 
  database: process.env.DB_NAME
};

app.use(cors({
  origin: 'https://gb-labyrinth-react.netlify.app'
}));

app.get("/highScores", (req, res) => {
  sql.connect(config, function (err) {
    if (err) console.log(err);

    let request = new sql.Request();

    request.execute('[dbo].[p_Get_Labyrinth_HighScores]', function (err, recordset) {
      if (err) {
        console.log(err)
      }

      res.send(recordset);
    });
  });
});

app.post('/highScoresPost', jsonParser, (req, res) => {
  console.log('--- POST HIT ---', req.body)
  let body = '';

  req.on('data', function (data) {
      body += data;
  });

  req.on('end', function () {
      const postData = qs.parse(body);

      sql.connect(config, function (err) {
        if (err) console.log(err);
  
        let request = new sql.Request();
  
        request
          .input('@HighScoreJson', sql.VarChar(100), postData)
          .execute('[dbo].[p_Manage_Labyrinth_HighScores]', function (err, recordset) {
            if (err) {
              console.log(err)
            }
  
            res.send(recordset);
          });
    });
  });
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
})