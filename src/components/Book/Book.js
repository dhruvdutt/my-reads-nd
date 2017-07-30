import React from 'react';
import './Book.css';

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(props.imageLinks.smallThumbnail)' }}></div>
      <div className="book-shelf-changer">
        <select onChange={(event) => props.moveBook(event, props.book)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading" disabled={props.type === 'currentlyReading'}>Currently Reading</option>
          <option value="wantToRead" disabled={props.type === 'wantToRead'}>Want to Read</option>
          <option value="read" disabled={props.type === 'read'}>Read</option>
          <option value="none" disabled={props.type === 'none'}>None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.book.title}</div>
    <div className="book-authors">{props.book.authors ? props.book.authors[0] : 'No author specified'}</div>
  </div>
);

export default Book;
