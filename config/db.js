const mongoose = require('mongoose');
const debug = require('debug')('app');
const config = require('config');
const db = config.get('URI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		// console.log('Mongo DB connected');
		debug('Mongo DB connected');
	} catch (error) {
		// console.log(error.message);
		debug(error.message);
		//Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
