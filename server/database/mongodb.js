const mongoose = require('mongoose');

const whichDB = process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.DB;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ojco1.mongodb.net/${whichDB}?retryWrites=true&w=majority`;

// mongoose.Promise = global.Promise;
mongoose.connect(uri); 
const connection = mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

module.exports = connection;