import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  loggedIn: computed('user', {
    get() {
      return this.get('user') !== null;
    }
  }).readOnly(),
  user: null
});
