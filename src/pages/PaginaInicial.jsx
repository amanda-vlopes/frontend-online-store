import React, { Component } from 'react';
import Header from '../components/Header';
import { getCategories } from '../services/api';

export default class Search extends Component {
  state = {
    categorias: [],
  };

  async componentDidMount() {
    const categorias = await getCategories();
    this.setState({ categorias });
  }

  render() {
    const { categorias } = this.state;
    return (
      <>
        <Header />
        <div>
          { categorias.map(({ name, id }) => (
            <button key={ id } data-testid="category">{name}</button>
          ))}
        </div>
        <div>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </div>
      </>
    );
  }
}
