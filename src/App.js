import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookShelf from './components/BookShelf/BookShelf';
import Search from './components/Search/Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route path='/' exact={true} component={ BookShelf } />
        <Route path='/search' exact={true} component={ Search } />
      </div>
    );
  }
}

export default App;
