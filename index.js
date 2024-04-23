const express = require("express");
// Create an Express application
const app = express();
const { MongoClient } = require("mongodb");

// MongoDB Atlas connection URI
const uri = "mongodb+srv://cl:cl@cluster0.avshxoj.mongodb.net/";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
}

app.post("/update", async (req, res) => {
  try {
    // Get a reference to the database
    const database = client.db("test");

    // Get a reference to the temperatura collection
    const temperaturaCollection = database.collection("temperatura");
    const filter = { _id: 1 };

    // Define the update operation
    const update = {
      $set: {
        temp: "20",
      },
    };
    const result = await temperaturaCollection.updateOne(filter, update);

    res.status(200).send("Document inserted successfully.");
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).send("Internal Server Error");
  }
});

connect();

const port = 3000; // Change this to your desired port number
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
