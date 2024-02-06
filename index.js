import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const uri = "mongodb+srv://mandic:BoDe28950@clusteralibaba.mmyhu6q.mongodb.net/?retryWrites=true&w=majority";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const authCodeSchema = new mongoose.Schema({
  code: String
});
const authCode = mongoose.model('Code', authCodeSchema);

try {
  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  await mongoose.connect(uri, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch {
  // Ensures that the client will close when you finish/error
  await mongoose.disconnect();
}

const app = new express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 4400;

app.get("/", (req, res) =>{
  res.send("hello");
});

app.post("/api/auth-code", async (req, res) => {
  const data = req.body;
  console.log(data);
  const codeData = new authCode({code: JSON.stringify(data)});
  await codeData.save();
  res.send("tamam");
})

app.listen(port, () => {
  console.log("listening from port:", port);
});
