const express = require('express');
const connectDB = require('./connection');
const route = require('./routers/route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/api', route);

const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
    app.listen(5000, () => {
      console.log('Server is listening on port number 5000');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

startServer();