import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import '../../App.css';
import Book from '../Book/Book';

class BookShelf extends React.Component {

  state = {
    loading: true,
    books: []
  };

  constructor(props) {
    super(props);

    this.moveBook = this.moveBook.bind(this);
    this.filterBooks = this.filterBooks.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(response => {
        this.setState({
          books: response,
          loading: false
        });
        console.log('BooksAPI.getAll', response);
      })
      .catch(err => {
        console.error('ERROR: BooksAPI.getAll', err);
      });
  }

  moveBook(event, book) {

    let { value } = event.target;

    BooksAPI.update(book, value)
      .then(response => {
        this.setState({
          books: this.state.books.map(book => {
            if (response.currentlyReading.indexOf(book.id) > 0) {
              book.shelf = 'currentlyReading';
            }
            if (response.wantToRead.indexOf(book.id) > 0) {
              book.shelf = 'wantToRead';
            }
            if (response.read.indexOf(book.id) > 0) {
              book.shelf = 'read';
            }

            return book;
          })
        })
      })
      .catch(err => {
        console.error('BooksAPI update ERROR', err);
      });
  }

  filterBooks(book, type, moveBook) {
    if (book.shelf === type) {
      return (
        <li key={book.id}>
          <Book
            book={book}
            type={type}
            moveBook={moveBook}
          />
        </li>
      )
    }

    return null;
  }

  render() {

    if (this.state.loading) {
      return (
        <div>
          <h1>Loading books...</h1>
        </div>
      )
    }

    let books = this.state.books;

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map(book => {
                      return this.filterBooks(book, 'currentlyReading', this.moveBook)
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map(book => {
                      return this.filterBooks(book, 'wantToRead', this.moveBook)
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map(book => {
                      return this.filterBooks(book, 'read', this.moveBook)
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf;
