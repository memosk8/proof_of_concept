const
  express = require('express'),
  authGoogle = require('./authGoogle'),
  app = express(),
  port = 1337;

app.set("view engine", "ejs");
// decode url params
app.use(express.urlencoded({ extended: true }));

// send html form view
app.get("/", (req, res) => {
  res.render("index");
})

//
app.post('/', async (req, res, next) => {

  // take account number from form 
  const { accNumber } = req.body;

  // validate account length 
  if (accNumber.length != 16) {
    res.status(400).render("failed");
  }
  else {
    const userInfo = await authGoogle(accNumber);
    if (userInfo) {
      res.status(200).render("success", { userInfo });
    }
  }
});

app.listen(port, (req, res) => console.log(`running on port ${port}`));