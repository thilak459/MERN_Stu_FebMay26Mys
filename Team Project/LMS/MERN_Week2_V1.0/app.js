require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollRoutes = require('./routes/enrollRoutes');
const progressRoutes = require('./routes/progressRoutes');

const app = express();

// Enable CORS for frontend requests
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretsessionkey',
  resave: false,
  saveUninitialized: false
}));
app.use(loggerMiddleware);

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/', enrollRoutes); 
app.use('/progress', progressRoutes);

app.use(errorMiddleware);

module.exports = app;