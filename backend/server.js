const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./src/db/connect.js');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const errorHandler = require('./src/helpers/errorhandler.js');

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Use the CLIENT_URL from the .env file
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true 
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// error handler middleware
app.use(errorHandler);

//routes
const routeFiles = fs.readdirSync('./src/routes');

routeFiles.forEach((file) => {
  // use dynamic import
  import(`./src/routes/${file}`)
    .then((route) => {
      app.use('/api/v1', route.default);
    })
    .catch((err) => {
      console.log('Failed to load route file', err);
    });
});

const server = async () => {
  try {
    await connect();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log('Failed to start server.....', error.message);
    process.exit(1);
  }
};

server();
