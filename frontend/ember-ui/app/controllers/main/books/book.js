import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service('store'),
  actions: {
    deleteBook: function(book) {
      this.store.findRecord('book', book.id, { backgroundReload: false }).then((book) => {
        book.destroyRecord().then(() => {
          alert('deleted');
          this.transitionToRoute('main.books');
        }).catch((error) => {
          alert('failed', error);
        });
      });
    }
  }
});
