import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  username: '',
  password: '',

  loginFailed: false,
  isProcessing: false,
  userService: service('user'),
  ajax: service('ajax'),

  actions: {
    login() {
      const token = btoa(this.username + ':' + this.password);
      this.ajax.post('login', {
        headers: {
          'Authorization': 'Basic ' + token
        }
      }).then(() => {
        this.set('userService.user', {
          username: this.username,
          token: token
        });
        // TODO save token to cookie
        this.transitionToRoute('main');
      }).catch((error) => {
        console.warn(error);
        this.set('loginFailed', true);
      });
      this.resetCredentials();
    }
  },
  resetCredentials: function() {
    this.setProperties({
      username: '',
      password: ''
    });
  }
  
});
