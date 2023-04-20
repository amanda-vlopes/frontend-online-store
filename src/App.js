import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Carrinho from './pages/Carrinho';
import PaginaInicial from './pages/PaginaInicial';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={ PaginaInicial } />
          <Route exact path="/carrinho" component={ Carrinho } />
        </Switch>
      </header>
    </div>
  );
}

export default App;
