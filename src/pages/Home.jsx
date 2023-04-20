import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';
import './Home.css';

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
    const { produtos, nomeProduto } = this.props;
    return (
      <div className="container">
        <div className="categorias__list">
          { categorias.map(({ name, id }) => (
            <button
              key={ id }
              className="categoria__btn"
              data-testid="category"
            >
              {name}

            </button>
          ))}
        </div>
        <div>
          {/* Link requisito 3 - redireciona para a pagina ShoppingCart */}
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </div>
        <div>
          <h3>
            {produtos.length > 0
              ? `Produtos relacionados a: ${nomeProduto}`
              : 'Nenhum produto foi encontrado'}
          </h3>
          { produtos.map(({ title, price, thumbnail, id }) => (
            <ul
              key={ id }
              data-testid="product"
              className="card__products"
            >
              <img src={ thumbnail } alt={ title } />
              <p>{ title }</p>
              <p>{ price }</p>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  nomeProduto: PropTypes.string.isRequired,
  produtos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
};
