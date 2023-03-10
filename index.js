const
  express = require('express'),
  { google } = require('googleapis'),
  app = express(),
  port = 1337;

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) => {
  res.render("index");
})

app.post('/', async (req, res) => {

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // create client instance for auth
  const
    spreadsheetId = "1ZxBAdpCSB63mcMkw4JFFDumfXPpX-U-Iagm4kR2d5w8",
    client = await auth.getClient(),
    // Instance of google sheets api
    googleSheets = google.sheets({ version: "v4", auth: client }),
    // get metadata from spreadsheet
    metaData = await googleSheets.spreadsheets.get({
      auth, spreadsheetId
    });

  // read rows from spreadsheet

  const getRows = await googleSheets.spreadsheets.values.get({
    auth, spreadsheetId, range: "Hoja 1"
  });

  // write rows to spreadsheet
  /*account_id	name	email	password*/
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Hoja 1!A:D",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        ["2948372838485948", "jhonny Jokes", "juanito@kekas.com", "password1234"]
      ],
    }
  })

  res.send(getRows.data);
})

app.listen(port, (req, res) => console.log(`running on port ${port}`));