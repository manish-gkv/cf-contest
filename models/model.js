const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  cf_user_name: String,
  contest_ID:[Number]
});

module.exports = mongoose.model('User', userSchema);