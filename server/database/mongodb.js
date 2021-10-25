const mongoose = require('mongoose');

const whichDB = process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.DB;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ojco1.mongodb.net/${whichDB}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;

mongoose.connect(uri); 
const connection = mongoose.connection
	.once('open', () => {
		if(process.env.NODE_ENV === 'test') {
			console.log(process.env.NODE_ENV)
			console.log('Test DB connection established!')
		} else {
			console.log(process.env.NODE_ENV)
			console.log('DB connection established!')
		}
	})
	.on('error', (error) => {
			console.warn('Error : ',error);
	});

module.exports = connection;