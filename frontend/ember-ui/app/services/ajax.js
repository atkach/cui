import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'ember-ui/config/environment';


export default AjaxService.extend({
  namespace: ENV.APP.API_NAMESPACE,
  host: ENV.APP.API_HOST,
  headers: {
    //'Access-Control-Allow-Origin': '*'
  }
});
