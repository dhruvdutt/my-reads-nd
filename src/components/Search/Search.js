import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Book from '../Book/Book';
import * as BooksAPI from '../../BooksAPI';
import keyIndex from 'react-key-index';

class Search extends Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.moveBook = this.moveBook.bind(this);
  }

  state = {
    query: '',
    loading: false,
    bookAdded: false,
    books: []
  };

  onSearch({ target }) {

    let { value } = target;
    if (value && value.length > 1) {

      this.setState({
        loading: true
      });

      BooksAPI.search(value, 10)
        .then(books => {
          this.setState({
            loading: false
          });

          if (this.state.books !== books) {
            this.setState({ books })
          }

        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        books: []
      });
    }
  }

  moveBook({ target }, book) {

    let { value } = target;

    BooksAPI.update(book, value)
      .then(response => {
        console.info("Book Added");
        this.setState({
          bookAdded: true
        });

      })
      .catch(err => {
        console.log(err);
      });
  }

  getSearchResults() {
    if (this.state.loading) {
      return (<h1>Loading...</h1>)
    }

    if (this.state.books && !this.state.books.length) {
      return (<h1>No results</h1>)
    }

    let books = keyIndex(this.state.books, 1);

    //console.log("Results:", books);

    return books.map(book => {
      return (
        <li>
          <Book
            key={book._idId}
            book={book}
            type={"none"}
            moveBook={this.moveBook}/>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.onSearch}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.getSearchResults()}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
