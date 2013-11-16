var fs = require('fs'),
  extend = require('util')._extend,
  json;

var jsonFile = fs.readFileSync(__dirname + '/json/us-states.json'); 

exports.states = function(req, res) {
  res.json(JSON.parse(jsonFile));
};

exports.state = function(req, res) {
  var stateName = req.params.name;
  var json = JSON.parse(jsonFile);

  json.features.forEach(function(state){
    if(state.properties.name != stateName)
      state.properties.backers = Math.floor(Math.random() * 100);
  });

  res.json(json);
};