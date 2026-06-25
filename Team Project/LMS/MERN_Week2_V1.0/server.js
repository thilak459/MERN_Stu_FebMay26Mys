require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const seedDatabase = require('./seed');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Connect to Database
  await connectDB();
  
  // Seed Database (creates default student/admin accounts and initial courses if empty)
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
