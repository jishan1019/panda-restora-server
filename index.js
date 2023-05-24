const express = require('express');
const cors = require('cors');
require('dotenv');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Requre----------------------------
const port = process.env.PORT || 4000;


// Middle were------------------------
app.use(cors());
app.use(express.json());


// Mongodb Code ----------------------
const uri = "mongodb+srv://express_server:cdsKZa6iXypKs0Ex@cluster0.q1ppz51.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection

        // Db Connect----------------
        const db = client.db("express_server");
        const allPlayCollection = db.collection("express_server")

        app.get('/allPlay', async (req, res) => {
            const play = await allPlayCollection
                .find({})
                .toArray();
            res.send(play);
        })


        await client.db("express_server").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// Local Cide ---------------------
app.get('/', (req, res) => {
    res.send("Hello Express Bd")
})

app.listen(port, () => {
    console.log("Server Running On Port 4000");
})