import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  username: '',
  password: '',

  loginFailed: false,
  isProcessing: false,
  userController: service('user'),
  ajax: service('ajax'),

  actions: {
    login() {
      this.ajax.request('login', {
        method: "POST",
        data: {
          username: this.get('username'),
          password: this.get('password')
        }
      }).then(() => {
        this.set('userController.user', {
          username: this.username
        });

      }).catch((error) => {
        console.warn(error);
        this.set('loginFailed', true);
      });
    }
  }
});
