const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/pet_adoption', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Pet Schema & Model
const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    state: String,
    city: String,
    owner: String,
    gender: String,
    age: String
});

const Pet = mongoose.model('Pet', petSchema);

// Route: Filter pets based on type, state, city
app.post('/filter-pets', async (req, res) => {
    const { petType, state, city } = req.body;

    const query = {
        ...(petType && { type: petType }),
        ...(state && { state }),
        ...(city && { city }),
    };

    try {
        const results = await Pet.find(query);
        res.json({ results });
    } catch (error) {
        console.error('❌ Error fetching pets:', error);
        res.status(500).json({ error: 'Server error while filtering pets' });
    }
});

// Route: Add pet manually (optional)
app.post('/add-pet', async (req, res) => {
    try {
        const newPet = new Pet(req.body);
        await newPet.save();
        res.status(201).json({ message: 'Pet added successfully', pet: newPet });
    } catch (error) {
        console.error('❌ Error saving pet:', error);
        res.status(500).json({ error: 'Failed to add pet' });
    }
});


app.get('/filter-pets', async (req, res) => {
    const { petType, state, city } = req.query;
  
    const query = {
      ...(petType && { type: petType }),
      ...(state && { state }),
      ...(city && { city }),
    };
  
    try {
      const results = await Pet.find(query);
      res.json({ results });
    } catch (error) {
      console.error('❌ Error fetching pets:', error);
      res.status(500).json({ error: 'Server error while filtering pets' });
    }
  });
  

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
