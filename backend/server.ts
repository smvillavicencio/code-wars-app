// Register models first
import "./models/judge";
import "./models/admin";
import "./models/team";
import "./models/submission";

import express from 'express';
import bodyParser from 'body-parser';
import { connectDB, handleDisconnectDB } from './config/db';
import sampleRoutes from './routes/sampleRoute';
import loginRoute from './routes/loginRoute';
import signupRoute from './routes/signupRoute';
import checkIfLoggedInRoute from './routes/checkIfLoggedInRoute';
import teamScoreRoutes from './routes/teamScoreRoutes';
import powerupRoutes from './routes/powerupRoute'
import submissionRoutes from './routes/submissionRoutes';
import adminRoutes from './routes/adminRoutes';
import { checkTokenMiddleware } from "./controllers/authController";

import './sockets/socket.js';

const cors = require("cors");
const app = express();

app.use(cors({
  origin : "http://localhost:3000",
  credentials: true,
  methods: ['POST', 'GET', 'PUT', 'DELETE']
}));

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
app.use(adminRoutes);

app.use(checkTokenMiddleware);

app.use(teamScoreRoutes);
app.use(powerupRoutes);
app.use(submissionRoutes);

//app.use('/api', sampleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
