const express = require('express');
const helmet = require("helmet");

const db = require('./src/models')
const {router } = require('./src/api')

const app = express();

app.use(helmet())
app.use('/api/v1', router)


const port = 3000;



app.get('/',(req,res) => {
  res.send('namaskaram nodejs')
})
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});