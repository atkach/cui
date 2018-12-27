import Service from '@ember/service';
import { computed } from '@ember/object';


export default Service.extend({
  loggedIn: computed('user', {
    get() {
      return this.get('user') !== null;
    }
  }).readOnly(),
  user: null
});
