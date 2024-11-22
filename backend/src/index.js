const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const sequelize = require('./config/postgres.config');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
const serviceAccount = require('./config/firebase/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const userPreferenceRoutes = require('./routes/userPreference.routes');
const transactionRoutes = require('./routes/transaction.routes');
const budgetRoutes = require('./routes/budget.routes');

app.use('/api/auth', authRoutes);
app.use('/api/preferences', userPreferenceRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

const PORT = process.env.PORT || 8000;

// Database Connection
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // This creates the tables if they don't exist
    console.log('PostgreSQL connection established successfully');
  } catch (error) {
    console.error('Unable to connect to database:', error);
    process.exit(1);
  }
};

initializeDatabase();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Finesse API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 