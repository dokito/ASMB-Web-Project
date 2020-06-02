const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const middlewares = require('./middlewares');

const users = require('./api/users');
const auth = require('./api/auth');
const events = require('./api/events');

const app = express();

//Body parser MiddleWare
app.use(express.json());

//DB Config

const db = process.env.DATABASE_URL;

//Connect to MongoDB

mongoose
.set('useUnifiedTopology', true)
.connect(db, { useNewUrlParser: true,
useCreateIndex: true })
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err));

//Use Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
     //Set static folder
     app.use(express.static('client/build'));

     app.get('*',(req, res) => {
         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
     });
}

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`Server started on port ${port}`));