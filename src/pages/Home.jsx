import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getCategories, getProductByQuery } from '../services/api';

export default class Home extends Component {
  state = {
    categorias: [],
    nomeProduto: '',
    produtos: [],
  };

  async componentDidMount() {
    const categorias = await getCategories();
    this.setState({ categorias });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSearch = async () => {
    const { nomeProduto } = this.state;
    const data = await getProductByQuery(nomeProduto);
    const produtos = data.results;
    this.setState({
      produtos,
    });
  };

  render() {
    const { categorias, nomeProduto, produtos } = this.state;
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
          <input
            type="text"
            name="nomeProduto"
            id="nomeProduto"
            value={ nomeProduto }
            data-testid="query-input"
            onChange={ this.handleChange }
          />
          <button
            data-testid="query-button"
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>

          {/* Link requisito 3 - redireciona para a pagina ShoppingCart */}
          <Link to="/shoppingcart" data-testid="shopping-cart-button">Carrinho</Link>
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
            <div key={ id } data-testid="product">
              <img src={ thumbnail } alt={ title } />
              <p>{ title }</p>
              <p>{ price }</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}
