const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Requre----------------------------
const port = process.env.PORT || 4000;

// Middle were------------------------
app.use(cors());
app.use(express.json());

// Mongodb Code ----------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q1ppz51.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("bistro_boss_db").command({ ping: 1 });

    // Db Connect and Collection----------------
    const db = client.db("bistro_boss_db");
    const menuCollection = db.collection("menu");
    const reviewCollection = db.collection("revew");
    const allChefRecomand = db.collection("chef_recomand");
    const cart_collection = db.collection("carts");
    const userCollection = db.collection("users");

    // Admin All Oparation Code Here--------------

    // Post Create User
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // All Get Oparation Code Here----------------

    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    app.get("/chefRecomand", async (req, res) => {
      const result = await allChefRecomand.find().toArray();
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        res.send([]);
      } else {
        const query = { email: email };
        const result = await cart_collection.find(query).toArray();
        res.send(result);
      }
    });

    // All Post Oparation Code Here----------------

    app.post("/carts", async (req, res) => {
      const item = req.body;
      console.log(item);
      const result = await cart_collection.insertOne(item);
      res.send(result);
    });

    // All Delete Oparation Code Here----------------
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cart_collection.deleteOne(query);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Local Cide ---------------------
app.get("/", (req, res) => {
  res.send("Hello Express Bd");
});

app.listen(port, () => {
  console.log("Server Running On Port 4000");
});
