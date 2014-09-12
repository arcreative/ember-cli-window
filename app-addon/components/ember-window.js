import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ember-window'],

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
  }
});
