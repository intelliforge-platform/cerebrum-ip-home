// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/user_registration', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  otherNames: String,
  address: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  dateOfBirth: Date,
  country: String,
  state: String,
  username: { type: String, unique: true },
  password: String,
  isApproved: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Routes

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, otherNames, address, email, phoneNumber, dateOfBirth, country, state, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      otherNames,
      address,
      email,
      phoneNumber,
      dateOfBirth,
      country,
      state,
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully. Waiting for admin approval.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Approval (this should be protected with admin authentication in a real application)
app.put('/api/approve-user/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isApproved: true }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User approved successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all countries (you might want to cache this data instead of fetching it every time)
app.get('/api/countries', async (req, res) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const formattedCountries = countries.map(country => ({
      code: country.cca2,
      name: country.name.common
    })).sort((a, b) => a.name.localeCompare(b.name));
    res.json(formattedCountries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get states for a country (this is a placeholder - you'd need a more comprehensive API or database for real data)
app.get('/api/states/:countryCode', (req, res) => {
  // This is a placeholder. In a real application, you'd fetch states based on the country code
  const placeholderStates = ['State 1', 'State 2', 'State 3'].map(state => ({
    code: state.toLowerCase().replace(' ', '_'),
    name: state
  }));
  res.json(placeholderStates);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});