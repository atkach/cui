import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  userController: Ember.inject.controller('user'),

  redirect() {
    if (!this.get('userController.loggedIn')) {
      this.transitionTo('login');
    }
  }
});
