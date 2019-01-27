import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | authors/author', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:main/authors/author');
    assert.ok(route);
  });
});
