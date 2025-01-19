const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const usersRouter = require('./routes/user');

const DBString = process.env.DATABASE_URL;

const app = express();

app.use(express.json());

mongoose.connect(DBString);
const database = mongoose.connection;

database.on('error', (error)=>{
	console.log(error);
});

database.once('connected', ()=>{
	console.log('Database Connected');
});

app.use('/api', usersRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));