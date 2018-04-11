import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('main', { path: '/' }, function() {
    this.route('about', { path: '/about' });
    this.route('books', function() {
      this.route('book', { path: '/:book_id' });
    });
    this.route('authors');
    this.route('author', { path: '/author/:author_id' });
    this.route('not-found', { path: '/*path' });
  });
  this.route('login');
});

export default Router;
