const express = require('express')
const connectTomongo=require('./db')
const cors=require('cors');
const app = express()
const port = 5000

connectTomongo();
app.use(express.json())
app.use(cors())

app.use('/api/auth',require('./routes/auth'));
app.use('/api/recipes',require('./routes/recipes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})