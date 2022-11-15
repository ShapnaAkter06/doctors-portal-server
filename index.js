const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qlhnchw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointmentCollection = client.db("doctorsPortal").collection("appointmentOptions");
        const bookingsCollection = client.db("doctorsPortal").collection("bookings")

        // amra database a j data gulo rekhechi segulo get korlam
        app.get('/appointmentOptions', async(req, res) => {
           const query = {};
           const options = await appointmentCollection.find(query).toArray();
           res.send(options);
        })

        app.post('/bookings', async (req, res) =>{
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })
      
    } finally {
      
    }
  }
  run().catch(err=> console.log(err));



app.get('/', async (req, res) => {
    res.send('Doctors portal server is running');
})

app.listen(port, async(req, res) => {
    console.log(`Server is running on port ${port}`);
})
