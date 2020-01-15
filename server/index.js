const express = require('express');
const NewBug = require('./db/queries.js').NewBug;
const app = express();

const bodyparser = require('body-parser');

app.use(bodyparser.json());

app.post('/bug', (req,res,next) => {
  console.log(req.body)
  var newBug = new NewBug(req.body)
  newBug.save()
  // .then((results) => res.send(results))
  res.send("You're bug is being processed")
})

app.get('/bug', (req, res, next) => {
  NewBug.find()
  .then((results) => res.send(results))
})


const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
}  )


module.exports = {
  app
}