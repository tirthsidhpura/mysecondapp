const mongoose = require('mongoose')

var itemschema =  new mongoose.Schema({
    name :String,
    phno : String
});

module.exports = mongoose.model('addname',itemschema)