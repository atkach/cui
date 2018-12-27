import DS from 'ember-data';
import ENV from 'ember-ui/config/environment';


export default DS.RESTAdapter.extend({
  namespace: ENV.APP.API_NAMESPACE,
  host: ENV.APP.API_HOST
});
