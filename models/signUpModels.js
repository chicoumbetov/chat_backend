const mongoose = require('mongoose');

const signUpTemplateSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: false },
  date: {type: Date, default: Date.now}
})  

module.exports = mongoose.model('SignUpTemplate', signUpTemplateSchema);