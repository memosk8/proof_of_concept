const
  express = require('express'),
  authGoogle = require('./authGoogle'),
  app = express(),
  port = 1337;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
})

app.post('/', async (req, res, next) => {

  const { accNumber } = req.body;

  if (accNumber.length != 16) {
    res.status(400).render("failed");
  }
  else {
    const userInfo = await authGoogle(accNumber);
    if (userInfo) {
      res.status(200).render("success", { userInfo });
    }
    else{
      res.status(404).render("failed")
    }
  }
});

app.listen(port, (req, res) => console.log(`running on port ${port}`));