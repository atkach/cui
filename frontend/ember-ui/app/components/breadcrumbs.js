import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';


export default Component.extend({
  router: service('router'),
  user: service('user'),
  current: alias('router.currentRouteName'),
  loggedIn: computed('user.loggedIn', function() {
    return this.get('user.loggedIn');
  }),

  breadcrumbs: computed('router.currentRoute', function() {
    const breadcrumbs = [];
    let route = this.router.currentRoute;
    const ignoredRoutes = ['application', 'index'];

    while(route) {
      if (!ignoredRoutes.includes(route.localName)) {
        breadcrumbs.push(this.createCrumb(route));
      }
      route = route.parent;
    }

    return breadcrumbs.reverse();
  }),

  createCrumb: function(route) {
    const isCurrent = !route.child || route.child.localName === 'index';
    const label = route.attributes && route.attributes.breadCrumbLabel ? route.attributes.breadCrumbLabel : route.localName;
    return {
      label,
      path: route.name,
      isCurrent,
      linkable: !isCurrent
    }
  }
});
