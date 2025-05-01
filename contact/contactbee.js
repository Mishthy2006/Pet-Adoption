// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const nodemailer = require('nodemailer');

// const app = express();
// const PORT = 3000;
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/contactus" ,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ Connected to MongoDB'))
// .catch((err) => console.error('❌ MongoDB error:', err));

// const contactSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   subject: String,
//   message: String,
//   date: { type: Date, default: Date.now },
// });
// const Contact = mongoose.model('Contact', contactSchema);

// // app.post('/contact', async (req, res) => {
// //   const { name, email, subject, message } = req.body;
// //   console.log("📥 Contact form data received:", req.body);
// //   if (!name || !email || !subject || !message) {
// //     return res.status(400).json({ message: 'All fields are required.' });
// //   }

// //   try {
// //     const newMessage = new Contact({ name, email, subject, message });
// //     await newMessage.save();

// //     const transporter = nodemailer.createTransport({
// //       service: 'gmail',
// //       auth: {
// //         user: EMAIL_USER,
// //         pass: EMAIL_PASS,
// //       },
// //     });

// //     const mailOptions = {
// //       from: email,
// //       to: EMAIL_USER,
// //       subject: `New Contact: ${subject}`,
// //       text: `From: ${name}\nEmail: ${email}\n\n${message}`,
// //     };

// //     await transporter.sendMail(mailOptions);

// //     res.status(200).json({ message: 'Message received! We will contact you soon.' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error. Please try again later.' });
// //   }
// // });
// app.post('/contact', async (req, res) => {
//   console.log("📥 POST /contact triggered");
//   console.log("🧾 Incoming data:", req.body);

//   const { name, email, subject, message } = req.body;

//   if (!name || !email || !subject || !message) {
//     console.log("❌ Missing fields!");
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     const newMessage = new Contact({ name, email, subject, message });
//     await newMessage.save();
//     console.log("✅ Successfully saved message to MongoDB");

//     res.status(200).json({ message: 'Message received! We will contact you soon.' });
//   } catch (err) {
//     console.error("❌ Save failed:", err);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/contactus", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now },
});
const Contact = mongoose.model('Contact', contactSchema);

// POST Route
app.post('/contact', async (req, res) => {
  console.log("📥 POST /contact triggered");
  const { name, email, subject, message } = req.body;
  console.log("🧾 Incoming data:", { name, email, subject, message });

  if (!name || !email || !subject || !message) {
    console.log("❌ Missing field(s) in the request");
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();
    console.log("✅ Message saved to MongoDB:", newMessage);

    res.status(200).json({ message: 'Message received! We will contact you soon.' });
  } catch (err) {
    console.error("❌ Error saving message:", err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
