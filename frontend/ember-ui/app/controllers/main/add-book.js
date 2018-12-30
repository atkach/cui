import Controller from '@ember/controller';
import { inject as service } from '@ember/service';


export default Controller.extend({
  title: '',
  author: '',
  year: '',
  isRead: false,
  review: '',

  ajax: service('ajax'),

  actions: {
    addBook() {
      this.ajax.post('books', {
        data: {
          name: this.title,
          author: this.author,
          year: Number(this.year),
          read: this.isRead,
          rating: 0,
          review: this.review
        }
      }).then((response) => {
        alert(response.message);
        this.transitionToRoute('main.books.book', response.book_id);
      }).catch((error) => {
        console.warn(error);
      });
    }
  },
});
