import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr('string'),
  authors: DS.hasMany('author', {async: true}),
  year: DS.attr('number'),
  rating: DS.attr('number'),
  read: DS.attr('boolean'),
  review: DS.attr('string'),
  breadCrumbLabel: computed('name', function () {
    return this.name;
  })
});
