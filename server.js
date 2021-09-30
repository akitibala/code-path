const express = require('express');
const helmet = require("helmet");
const cors = require('cors')
// const db = require('./src/models')
const {router } = require('./src/api')

const app = express();

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api/v1', router)


const port = 3000;



app.get('/',(req,res) => {
  res.send('namaskaram nodejs')
})
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});