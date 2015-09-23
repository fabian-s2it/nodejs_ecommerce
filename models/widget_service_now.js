var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WidgetServiceNow   = new Schema({
  chart_type : {
    type: String,
    required: true
  },
  filter_by : {
    type: String,
    required: true
  },
  filters : [{
    type : String,
    required: false
  }],
  teams : [{
    type : String,
    required : false
  }],
  params : [{
    type: Schema.Types.ObjectId,
    ref: "Param",
    required: false
  }]
});

module.exports = mongoose.model('WidgetServiceNow', WidgetServiceNowSchema);