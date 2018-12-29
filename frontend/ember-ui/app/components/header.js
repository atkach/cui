import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  user: service('user'),
  cookies: service('cookies'),
  loggedIn: computed('user.loggedIn', function() {
    return this.get('user.loggedIn');
  }),
  actions: {
    logout () {
      this.user.logout();
    }
  }
});
