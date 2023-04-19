import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={ Search } />
        </Switch>
      </header>
    </div>
  );
}

export default App;
