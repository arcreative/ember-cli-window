import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  classNameBindings: [':ember-window', 'styled'],
  attributeBindings: ['tabindex'],

  containerSelector: null,

  confirmable: true,
  escapable: true,
  highlightFirst: true,
  styled: false,

  tabindex: -1,
  width: 300,
  minWidth: 300,
  maxWidth: 960,
  height: 'auto',
  minHeight: 100,
  maxHeight: 600,

  keyDown: function(e) {
    if (this.get('confirmable') && e.keyCode === 13 && document.activeElement.tagName === 'INPUT') {
      this.send('save');
    }
  },
  keyUp: function(e) {
    if (this.get('escapable') && e.keyCode === 27) {
      this.send('close');
    }
  },

  didInsertElement: function() {
    this.$().focus();
    if (this.get('highlightFirst')) {
      this.$(':input:not(.close):first').focus();
    }
  },

  updateStyle: function() {
    if (!this.$() || !this.get('styled')) {
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
    this.appendTo(this.get('containerSelector') || getOwner(this).lookup('application:main').get('rootElement'));
    return this;
  },
  close: function() {
    this.destroy();
  },

  actions: {
    close: function() {
      this.close();
    },
    save: Ember.K
  }
});
