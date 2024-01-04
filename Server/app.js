const express = require('express')
const cors = require('cors');
const routes = require('./routes')
const morgan = require('morgan')
const bodyParser = require('body-parser');

const app = express()

app.use(cors())
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 8081

routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})