const
  express = require('express'),
  { google } = require('googleapis'),
  app = express(),
  port = 1337;

app.get('/', async (req, res) => {

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // create client instance for auth
  const 
    spreadsheetId = "1ZxBAdpCSB63mcMkw4JFFDumfXPpX-U-Iagm4kR2d5w8",
    client = await auth.getClient(),
    // Instance of google sheets api
    googleSheets = google.sheets({version: "v4", auth: client}),
    // get metadata from spreadsheet
    metaData = await googleSheets.spreadsheets.get({
      auth, spreadsheetId
    });


    res.send(metaData)
})

app.listen(port, (req,res) => console.log(`running on port ${port}`));