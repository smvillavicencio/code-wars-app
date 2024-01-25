// Register models first
import "./models/judge";

import express from 'express';
import bodyParser from 'body-parser';
import { connectDB, handleDisconnectDB } from './config/db';
import sampleRoutes from './routes/sampleRoute';
import loginRoute from './routes/loginRoute';


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
handleDisconnectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(loginRoute);
app.use('/api', sampleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
