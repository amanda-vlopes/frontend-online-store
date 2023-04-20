import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </div>
      </>
    );
  }
}
