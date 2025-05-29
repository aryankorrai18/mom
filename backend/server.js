const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: "https://mom-eosin.vercel.app",
  credentials: true
}));

app.use(express.json());

// Root route for Render test
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Mount route files
app.use('/api/auth', require('./routes/authenticationRoutes'));
app.use('/api/leaves', require('./routes/authenticationRoutes'));
app.use('/api/admin', require('./routes/authenticationRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});