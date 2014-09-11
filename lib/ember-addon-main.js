'use strict';

var path = require('path');
var fs = require('fs');

function EmberCLIWindow(project) {
  this.project = project;
  this.name = 'ember-cli-window';
}


function unwatchedTree(dir) {
  return {
    read:    function() {
      return dir;
    },
    cleanup: function() {}
  };
}

EmberCLIWindow.prototype.treeFor = function(name) {
  var treePath =  path.join('node_modules', 'ember-cli-window', name + '-addon');

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

EmberCLIWindow.prototype.included = function(app) {
  this.app = app;

  if (this.app.env !== 'production') {
    this.app.import('vendor/ember-cli-window/styles/style.css');
  }
};

module.exports = EmberCLIWindow;
