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

app.post("/update/:temp", async (req, res) => {
  try {
    const temp = req.params.temp;

    if (temp !== -1 || temp.trim() === "" || isNaN(parseFloat(temp))) {
      throw new Error("Temperature value is missing or invalid.");
    }

    const database = client.db("test");

    const temperaturaCollection = database.collection("temperatura");

    const filter = { _id: 1 };

    const update = {
      $set: {
        temp: temp,
      },
    };

    const result = await temperaturaCollection.updateOne(filter, update);

    res.status(200).send("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/data", async (req, res) => {
  try {
    const database = client.db("test");

    const temperaturaCollection = database.collection("temperatura");

    const documents = await temperaturaCollection.find({ _id: 1 }).toArray();

    res.status(200).json(documents[0].temp);
  } catch (error) {
    console.error("Error retrieving documents:", error);
    res.status(500).send("Internal Server Error");
  }
});

connect();

const port = 3000; // Change this to your desired port number
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
