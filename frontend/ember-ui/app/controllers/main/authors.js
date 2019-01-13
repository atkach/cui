import Controller from '@ember/controller';
import { inject as service } from '@ember/service';


export default Controller.extend({
  store: service('store'),
  actions: {
    deleteAuthor: function(author) {
      this.store.findRecord('author', author.id, { backgroundReload: false }).then((author) => {
        author.destroyRecord().then(() => {
          alert('deleted');
        }).catch((error) => {
          alert('failed', error);
        });
      });
    }
  }
});
