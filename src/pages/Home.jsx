import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getCategories } from '../services/api';

export default class Home extends Component {
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
          {/* Input e button requisito 5 */}
          <input type="text" name="" id="" data-testid="query-input" />
          <button data-testid="query-button">Pesquisar</button>
          {/* Link requisito 3 - redireciona para a pagina ShoppingCart */}
          <Link to="/shoppingcart" data-testid="shopping-cart-button">Carrinho</Link>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </div>
      </>
    );
  }
}
