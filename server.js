const express = require('express');
const app = express();
const port = process.env.PORT;
const proxy = process.env.QUOTAGUARDSHIELD_URL;

const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER, 
  database: process.env.DB_NAME 
};

app.get("/highScores", (req, res) => {
  sql.proxy = proxy;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    let request = new sql.Request();
        
    //request.proxy = proxy;
    request.query('[dbo].[p_Get_Labyrinth_HighScores]', function (err, recordset) {
      if (err) {
        console.log(err)
      }

      res.send(recordset);
    });
  });
});

app.post('/highScores', (req, res) => {
  console.log('request: ', req)

  // sql.connect(config, function (err) {
  
  //     if (err) console.log(err);

  //     let request = new sql.Request();
         
  //     request.query('[dbo].[p_Get_Labyrinth_HighScores]', function (err, recordset) {
  //       if (err) {
  //         console.log(err)
  //       }

  //       res.send(recordset);
  //     });
  // });
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
})