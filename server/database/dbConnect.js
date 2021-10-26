const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' })

const whichDB = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DEV_DB_NAME;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ojco1.mongodb.net/${whichDB}?retryWrites=true&w=majority`;

mongoose.promise = Promise.global;

dbConnect = async () => {
	mongoose.connect(uri, () => { 'which db: ', console.log(whichDB); });
	const db = mongoose.connection;
	db.once('open', () => { console.log('Connected to: ', uri) })
	db.on('error', (error) => { console.log(error.message) });;
}

dbClose = () => {
	return mongoose.disconnect(() => { console.log('Connection closed') });
}
module.exports = { dbConnect, dbClose };