const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/petAdoptionDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const adoptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  petType: String,
  message: String,
});

const Adoption = mongoose.model("Adoption", adoptionSchema);

app.post("/adopt", async (req, res) => {
  try {
    const newAdoption = new Adoption(req.body);
    await newAdoption.save();
    res.json({ message: "Adoption request submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});






