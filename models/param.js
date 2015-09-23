var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ParamSchema   = new Schema({
  name : {
    type: String,
    required: true
  },
  value : {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Param', ParamSchema);