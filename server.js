const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

const sql = require("mssql");

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

app.post('/highScoresPost', (req, res) => {
  console.log('request: ', req)

  sql.connect(config, function (err) {
      if (err) console.log(err);

      let request = new sql.Request();

      request.input('@HighScoreJson', sql.VarChar(100), req.body);
      request.execute('[dbo].[p_Manage_Labyrinth_HighScores]', function (err, recordset) {
        if (err) {
          console.log(err)
        }

        res.send(recordset);
      });
  });
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
})