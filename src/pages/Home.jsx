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

  // handleCategory = async () => {
  //   const produtosCategoria = await getProductByCategory('MLB5672');
  //   // console.log(produtosCategoria);
  // }

  render() {
    const { categorias } = this.state;
    const { produtos, nomeProduto, handleCategory } = this.props;
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
      </>
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
  handleCategory: PropTypes.func.isRequired,
};
