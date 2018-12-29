import Service from '@ember/service';
import { bool } from '@ember/object/computed';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';


export default Service.extend({
  user: null,
  cookies: service('cookies'),
  router: service('router'),
  loggedIn: bool('user').readOnly(),
  syncCookies: observer('user', function() {
    if (this.user) {
      this.cookies.set('auth', {
        username: this.user.username,
        token: this.user.token
      });
    } else {
      this.cookies.remove('auth');
    }
  }),
  logout () {
    this.set('user', null);
    this.router.transitionTo('login');
  }
});
