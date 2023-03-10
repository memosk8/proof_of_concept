const
  express = require('express'),
  { google } = require('googleapis'),
  app = express(),
  port = 1337;

app.get('/', (req, res) => {
  res.send("Hello there kenobi...")
})

app.listen(port, (req,res) => console.log(`running on port ${port}`))