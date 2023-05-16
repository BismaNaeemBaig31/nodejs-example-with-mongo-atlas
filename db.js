var mongoose = require('mongoose');
var uri = process.env.MONGO_URL;

mongoose.connect(uri, { useNewUrlParser: true });
