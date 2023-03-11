async function authGoogle(accNumber) {
  const { google } = require('googleapis');
  const spreadsheetId = "1ZxBAdpCSB63mcMkw4JFFDumfXPpX-U-Iagm4kR2d5w8";
  // google auth obj
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // create client instance for auth
  const client = await auth.getClient();
    // Instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth, spreadsheetId, range: "accounts"
  });

  // validate if account number is on the spreadsheet
  const rows = getRows.data.values;
  let response;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] == accNumber) {
      response = rows[i];
    }
  }

  return response;
}

module.exports = authGoogle;