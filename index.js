const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const middleware = require('./middlewares');
const users = require('./api/users');

const app = express();

mongoose
.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err));

//Body parser Middleware
app.use(morgan('common'));
app.use(helmet());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN
    })
)

//fix from stackoverflow
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

//Use Routes
app.use('/api/users', users);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});