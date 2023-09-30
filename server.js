const express = require('express');
const app = express();
const cors = require('cors');
const sql = require("mssql");

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

app.use(express.json());

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

app.post('/highScores', (req, res) => {
  console.log('--- POST HIT ---', req.body)
  
  sql.connect(config, function (err) {
    if (err) console.log(err);
    
    let request = new sql.Request();
    
    request
      .input('Name', sql.VarChar(50), req.body.name)
      .input('Score', sql.Int, req.body.score)
      .input('Moves', sql.Int, req.body.moves)
      .input('Difficulty', sql.VarChar(50), req.body.difficulty)
      .execute('[dbo].[p_Manage_Labyrinth_HighScores]', function (err, recordset) {
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