import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  userService: service('user'),

  redirect() {
    if (!this.get('userService.loggedIn')) {
      this.transitionTo('login');
    }
  }
});
