const express = require('express');
const app = express();

const sql = require("mssql");
const config = {
  user: 'DB_USER',
  password: 'DB_PASS',
  server: 'DB_SERVER', 
  database: 'DB_NAME' 
};

app.get('/highScores', (req, res) => {
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      let request = new sql.Request();
         
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

app.listen(4000, () => {
  console.log('Server started on port 4000')
})