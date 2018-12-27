import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  authors: DS.attr(),
  year: DS.attr('number'),
  rating: DS.attr('number'),
  read: DS.attr('boolean'),
  review: DS.attr('string')
});
