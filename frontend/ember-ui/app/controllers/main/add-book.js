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
      let authorId;
      this.ajax.post('authors', {
        data: {
          firstName: this.author.split(' ')[0],
          lastName: this.author.split(' ')[1],
          birthday: new Date(),
          biography: '',
          books: JSON.stringify([this.title])
        }
      }).then((response) => {
        authorId = response.author_id;
        this.ajax.post('books', {
          data: {
            name: this.title,
            authors: JSON.stringify([response.author_id]),
            year: Number(this.year),
            read: this.isRead,
            rating: 0,
            review: this.review
          }
        }).then((response) => {
          this.ajax.put('authors/' + authorId, {
            data: {
              books: JSON.stringify([response.book_id])
            }
          });
          alert(response.message);
          this.transitionToRoute('main.books.book', response.book_id);
        }).catch((error) => {
          console.warn(error);
        });
      }).catch((reponse) => {
        alert(response.message);
      });
    }
  },
});
