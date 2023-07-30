const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const Candidate = require('./models/candidate');
const path = require('path');

//routes
const me = require('./routes/me');
const admin = require('./routes/admin');
const login = require('./routes/login');
const register = require('./routes/register');
const vote = require('./routes/vote');
const candidate = require('./routes/candidates');

// middleware
const checkForAuth = require('./middleware/auth');
const adminAuthentication = require('./middleware/admin');

// express setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);

// connec to db
const connectToMongo = async () => {
  const options = { useNewUrlParser: true };
  const err = await mongoose
    .connect(
      'mongodb+srv://shivam:shivam@cluster0.j015aib.mongodb.net/interview-test?retryWrites=true&w=majority',
      options
    )
    .catch((err) => err);
  err.message;
};
connectToMongo();

// session setup
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// Serve static files from the Next.js app
app.use(express.static(path.join(__dirname, './frontend/out')));

// routes
app.use('/api/me', me);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/admin', adminAuthentication, admin);
app.use('/api/vote', checkForAuth, vote);
app.use('/api/candidates', checkForAuth, candidate);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/out', 'index.html'));
});

app.get('/vote', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/out', 'vote.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/out', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/out', 'register.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/out', 'admin.html'));
});

// start
app.listen(3000, () => {
  console.log('running on port 3000');
});
