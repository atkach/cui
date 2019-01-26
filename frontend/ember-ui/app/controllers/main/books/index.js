import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { set } from '@ember/object';


export default Controller.extend({
  store: service('store'),

  init() {
    this._super(...arguments);

    this.sortState = {
      title: {
        up: '',
        down: ''
      },
      rating: {
        up: '',
        down: ''
      },
      year: {
        up: '',
        down: ''
      }
    };
  },

  currentSortColumn: null,

  currentFilterInput: '',

  activeFilterInput: '',

  content: computed('model.books', 'currentSortColumn', 'activeFilterInput', function() {
    let data = this.model.books;
    if (this.currentSortColumn) {
      data = data.sortBy(this.currentSortColumn.column);
      if (this.currentSortColumn.direction === 'up') {
        data = data.reverse();
      }
    }
    if (this.activeFilterInput) {
      data = data.filter((row) => {
        return row.name.includes(this.activeFilterInput);
      });
    }
    return data;
  }),

  resetSort(column) {
    for(let i in this.sortState) {
      if (i !== column) {
        set(this.sortState[i], 'up', '');
        set(this.sortState[i], 'down', '');
      }
    }
  },

  actions: {
    filterTable() {
      this.set('activeFilterInput', this.currentFilterInput);
    },
    sortBy (column) {
      const state = this.sortState[column];

      if (state.up === '') {
        this.set('currentSortColumn', {
          column: column,
          direction: 'up'
        });
        set(state, 'up', 'hidden');
        set(state, 'down', '');
      } else {
        this.set('currentSortColumn', {
          column: column,
          direction: 'down'
        });
        set(state, 'down', 'hidden');
        set(state, 'up', '');
      }
      this.resetSort(column);
    },
    deleteBook: function(book) {
      this.store.findRecord('book', book.id, { backgroundReload: false }).then((book) => {
        book.destroyRecord().then(() => {
          alert('deleted');
        }).catch((error) => {
          alert('failed', error);
        });
      });
    }
  }
});
