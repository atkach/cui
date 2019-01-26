import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  birthday: DS.attr('date'),
  books: DS.hasMany('book', {async: true}),
  biography: DS.attr('string'),
  breadCrumbLabel: computed('firstName', 'lastName', function () {
    return `${this.firstName} ${this.lastName}`;
  })
});
