import Controller from '@ember/controller';
import $ from 'jquery';
import Ember from 'ember';

export default Controller.extend({
  username: '',
  password: '',

  loginFailed: false,
  isProcessing: false,
  userController: Ember.inject.controller('user'),

  actions: {
    login() {
      $.ajax({
        url: '/api/v1/login',
        type: "POST",
        data: {
          username: this.get('username'),
          password: this.get('password')
        }
      }).then(() => {
        this.set('userController.user', {
          username: this.get('username')
        });

      }).catch((error) => {
        this.set('loginFailed', true);
      });
    }
  }
});
