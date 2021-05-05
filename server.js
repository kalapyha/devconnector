const express = require('express');
const connectDB = require('./config/db');
const debug = require('debug')('app');

const app = express();

//Connect to DB
connectDB();

app.get('/', (req, res) => {
	res.send('API running');
});

//Init Middleware
app.use(express.json());

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	// console.log(`Server is running on port ${PORT}`);
	debug(`Server is running on port ${PORT}`);
});
