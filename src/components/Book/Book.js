import React from 'react';
import './Book.css';

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover book-img" style={{backgroundImage: `url(${props.book.imageLinks && props.book.imageLinks.smallThumbnail})`}}/>
      <div className="book-shelf-changer">
        <select value={props.book.shelf} onChange={(event) => props.moveBook(event, props.book)}>
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
