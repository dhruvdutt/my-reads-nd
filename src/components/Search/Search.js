import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Book from '../Book/Book';
import * as BooksAPI from '../../BooksAPI';

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
    if (value && value.length > 3) {

      this.setState({
        loading: true
      });

      BooksAPI.search(value, 10)
        .then(response => {
          this.setState({
            loading: false,
            books: response
          });
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

    let books = this.state.books.map(book => {
      return (
        <h1 key={book.id}>
          <p>{ book.name }</p>
        </h1>
      );
    });

    return books;
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
