// Register models first
import "./models/judge";
import "./models/admin";
import "./models/team";

import express from 'express';
import bodyParser from 'body-parser';
import { connectDB, handleDisconnectDB } from './config/db';
import sampleRoutes from './routes/sampleRoute';
import loginRoute from './routes/loginRoute';
import signupRoute from './routes/signupRoute';
import checkIfLoggedInRoute from './routes/checkIfLoggedInRoute';


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
handleDisconnectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(loginRoute);
app.use(signupRoute);
app.use(checkIfLoggedInRoute);
app.use('/api', sampleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
