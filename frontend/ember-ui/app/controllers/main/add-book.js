import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  title: '',
  author: '',
  year: '',
  isRead: false,
  review: '',

  ajax: service('ajax'),
  store: service('store'),

  actions: {
    addBook() {
      let authorId;
      this.getAuthor(this.author).then((author) => {
        this.ajax.post('books', {
          data: {
            name: this.title,
            authors: JSON.stringify([author.id]),
            year: Number(this.year),
            read: this.isRead,
            rating: 0,
            review: this.review
          }
        }).then((response) => {
          this.ajax.put('authors/' + author.id, {
            data: {
              books: JSON.stringify(author.books.mapBy('id').concat([response.book_id]))
            }
          });
          alert(response.message);
          this.transitionToRoute('main.books.book', response.book_id);
        }).catch((error) => {
          console.warn(error);
        });
      }).catch((response) => {
        alert(response.message);
      });
    }
  },
  getAuthor(author) {
    const firstName = author.split(' ')[0];
    const lastName = author.split(' ')[1];
    const existedAuthor = this.store.peekAll('author').find((authorRecord) => {
      return authorRecord.firstName === firstName && authorRecord.lastName === lastName;
    });
    if (existedAuthor) {
      return new Promise((resolve, reject) => {
        resolve(existedAuthor);
      });
    } else {
      return new Promise((resolve, reject) => {
        this.ajax.post('authors', {
          data: {
            firstName: firstName,
            lastName: lastName,
            birthday: new Date(),
            biography: '',
            books: JSON.stringify([])
          }
        }).then((response) => {
          resolve(this.store.createRecord('author', {
            id: response.author_id,
            firstName: firstName,
            lastName: lastName,
            birthday: new Date(),
            biography: '',
            books: []
          }));
        }).catch(reject);
      });
    }
  }
});
