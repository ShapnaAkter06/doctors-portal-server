const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Doctors portal server is running');
})

app.listen(port, async(req, res) => {
    console.log(`Server is running on port ${port}`);
})
