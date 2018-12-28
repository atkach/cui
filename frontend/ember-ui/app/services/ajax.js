import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'ember-ui/config/environment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


export default AjaxService.extend({
  namespace: ENV.APP.API_NAMESPACE,
  host: ENV.APP.API_HOST,
  userService: service('user'),
  headers: computed('userService.user.token', {
    get() {
      let headers = {};
      const token = this.get('userService.user.token');
      if (token) {
        headers['Authorization'] = 'Basic ' + token;
      }
      return headers;
    }
  })
});
