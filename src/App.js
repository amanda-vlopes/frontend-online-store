import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import { getProductByQuery } from './services/api';

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
              />) }
          />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
        </Switch>
      </div>
    );
  }
}

export default App;
