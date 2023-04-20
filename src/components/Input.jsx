import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Input;
