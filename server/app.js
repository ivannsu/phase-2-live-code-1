const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');
const quoteRoutes = require('./routes/quote');

mongoose.connect('mongodb://localhost:27017/quotes-live-code-1', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to mongooese...'));

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/quotes', quoteRoutes);

app.listen(process.env.PORT || '3000', () => console.log('Connected to server...'));