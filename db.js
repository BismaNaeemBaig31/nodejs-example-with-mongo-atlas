var mongoose = require('mongoose');
var uri = process.env.MONGO_URL;

function connectDB() {
  mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => console.log('Database connected'))
    .catch(error => console.error('Database connection failed:', error));
}

connectDB();
