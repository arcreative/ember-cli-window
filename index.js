'use strict';

module.exports = {
  name: 'ember-cli-window',

  included: function included(app) {
    this.app = app;

    if (this.app.env !== 'production') {
      // this.app.import('vendor/ember-window/ember-window.js');
    }
  }
};
