import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':ember-window', 'closable'],

  containerSelector: null,
  parentView: null,

  width: 300,
  minWidth: 300,
  maxWidth: 960,
  height: 'auto',
  minHeight: 100,
  maxHeight: 600,

  updateStyle: function() {
    if (!this.$()) {
      return;
    }
    this.$().css({
      'width': this.get('width'),
      'min-width': this.get('minWidth'),
      'max-width': this.get('maxWidth'),
      'height': this.get('height'),
      'min-height': this.get('minHeight'),
      'max-height': this.get('maxHeight')
    });
    this.$().css('margin-left', -this.$().outerWidth() / 2);
  }.observes('width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight').on('didInsertElement'),

  show: function() {
    this.set('_parentView', this.get('parentView') || this.container.lookup('view:toplevel'));
    this.appendTo(this.get('containerSelector') || this.container.lookup('application:main').get('rootElement'));
    return this;
  },
  close: function() {
    this.destroy();
  },

  actions: {
    close: function() {
      this.close();
    }
  },

  //Hack since Ember.Component does not support {{yield}} when there is no parentView
  _yield: function() {
    return Em.View.prototype._yield.apply(this, arguments);
  }
});
