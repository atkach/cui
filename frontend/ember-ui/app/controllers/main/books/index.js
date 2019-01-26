import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Controller.extend({
  store: service('store'),
  content: computed('model.books', function() {
    return this.get('model.books')
      .sortBy('name')
      .filterBy('name', 'hoho')
  }),

  actions: {
    deleteBook: function(book) {
      this.store.findRecord('book', book.id, { backgroundReload: false }).then((book) => {
        book.destroyRecord().then(() => {
          alert('deleted');
        }).catch((error) => {
          alert('failed', error);
        });
      });
    }
  }
});
