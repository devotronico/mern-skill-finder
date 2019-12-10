const mongoose = require('mongoose');
const config = require('config'); // carica il file config.js
const db = config.get('mongoURI'); // ottiene il valore della prop mongoURI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connesso...');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
