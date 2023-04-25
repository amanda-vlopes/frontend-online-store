import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    const { produtos, nomeProduto, handleCategory, handleAddToCart } = this.props;
    return (
      <>
        <div className="home-message">
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
          <h3>
            {produtos.length > 0
              ? `Produtos relacionados a: ${nomeProduto}`
              : 'Nenhum produto foi encontrado'}
          </h3>
        </div>
        <div className="container">
          <div className="categorias__list">
            { categorias.map(({ name, id }) => (
              <button
                key={ id }
                id={ id }
                className="categoria__btn"
                data-testid="category"
                onClick={ handleCategory }
              >
                {name}

              </button>
            ))}
          </div>
          <div>
            <ul>
              { produtos.map(({ title, price, thumbnail, id }) => (
                <li
                  key={ id }
                  id={ id }
                  data-testid="product"
                  className="card__products"
                >
                  <Link
                    key={ id }
                    to={ `product/${id}` }
                    data-testid="product-detail-link"
                  >
                    <img src={ thumbnail } alt={ title } />
                    <p>{ title }</p>
                    <p>{ price }</p>
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    onClick={ (event) => {
                      handleAddToCart(event, thumbnail, price, title);
                      window.dispatchEvent(new Event('cartUpdate'));
                    } }
                    id={ id }
                  >
                    Adicionar ao carrinho
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  handleCategory: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  nomeProduto: PropTypes.string.isRequired,
  produtos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};
