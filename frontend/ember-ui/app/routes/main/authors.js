import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model: function() {
    return RSVP.hash({
      books: this.get('store').findAll('book'),
      authors: this.get('store').findAll('author')
    });
  }
});
