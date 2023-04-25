import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import { getProductByCategory, getProductByQuery } from './services/api';

class App extends React.Component {
  state = {
    nomeProduto: '',
    produtos: [],
  };

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

  handleCategory = async ({ target }) => {
    const produtosCategoria = await getProductByCategory(target.id);
    const produtos = produtosCategoria.results;
    this.setState({
      produtos,
    });
  };

  handleAddToCart = (event, img, price, title) => {
    const { id } = event.target;
    price = price.toLocaleString(
      'pt-BR',
      { style: 'currency', currency: 'BRL' },
    );
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find((item) => item.id === id);
    if (product) {
      product.quantity += 1;
    } else {
      cart.push({ id, title, img, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  render() {
    const { nomeProduto, produtos } = this.state;
    return (
      <div className="App">
        <Header
          nomeProduto={ nomeProduto }
          produtos={ produtos }
          handleChange={ this.handleChange }
          handleSearch={ this.handleSearch }
        />
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home
                { ...props }
                produtos={ produtos }
                nomeProduto={ nomeProduto }
                handleCategory={ this.handleCategory }
                handleAddToCart={ this.handleAddToCart }
              />) }
          />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route
            path="/product/:id"
            render={ (props) => (
              <ProductDetails
                { ...props }
                handleAddToCart={ this.handleAddToCart }
              />) }
          />
          <Route exact path="/checkout" component={ Checkout } />
        </Switch>
      </div>
    );
  }
}

export default App;
