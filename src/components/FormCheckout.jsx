import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FormCheckout extends Component {
  state = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereço: '',
    pagamento: false,
    validForm: false,
    clicked: false,
  };

  handleChangeInput = ({ target }) => {
    const { name } = target;
    const value = target.type === 'radio' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleIsFormValid = () => {
    this.setState({ clicked: true });
    const { nome, email, cpf, telefone, cep, endereço, pagamento } = this.state;
    const { history } = this.props;
    const isNameValid = nome.length > 0;
    const isEmailValid = email.length > 0;
    // const onze = 11;
    // const nove = 9;
    // const oito = 8;
    const isCpfValid = cpf.length > 0;
    const isPhoneValid = telefone.length > 0;
    const isCepValid = cep.length > 0;
    const isEnderecoValid = endereço.length > 0;
    const formValid = isNameValid && isEmailValid && isCpfValid && isPhoneValid
    && isCepValid && isEnderecoValid && pagamento;
    console.log(formValid);
    if (!formValid) {
      this.setState({ validForm: false });
    } else {
      history.push('/');
      localStorage.setItem('cart', JSON.stringify([]));
      this.setState({ validForm: true });
    }
  };

  render() {
    const { nome, email, cpf, telefone, cep, endereço, pagamento,
      clicked, validForm } = this.state;
    return (
      <div>
        <div>
          <p>Informações do Comprador</p>
          <input
            type="text"
            name="nome"
            value={ nome }
            placeholder="Nome Completo"
            onChange={ this.handleChangeInput }
            data-testid="checkout-fullname"
          />
          <input
            type="text"
            name="email"
            value={ email }
            placeholder="Email"
            onChange={ this.handleChangeInput }
            data-testid="checkout-email"
          />
          <input
            type="text"
            name="cpf"
            value={ cpf }
            placeholder="CPF"
            onChange={ this.handleChangeInput }
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            name="telefone"
            value={ telefone }
            placeholder="Telefone"
            onChange={ this.handleChangeInput }
            data-testid="checkout-phone"
          />
          <input
            type="text"
            name="cep"
            value={ cep }
            placeholder="CEP"
            onChange={ this.handleChangeInput }
            data-testid="checkout-cep"
          />
          <input
            type="text"
            name="endereço"
            value={ endereço }
            placeholder="Endereço Completo"
            onChange={ this.handleChangeInput }
            data-testid="checkout-address"
          />
        </div>
        <div>
          <p>Método de Pagamento</p>
          <label htmlFor="boleto">
            <input
              type="radio"
              name="pagamento"
              id="boleto"
              value={ pagamento }
              data-testid="ticket-payment"
              onChange={ this.handleChangeInput }
            />
            Boleto
          </label>
          <div>
            <p>Cartão de Crédito</p>
            <label htmlFor="visa">
              <input
                type="radio"
                name="pagamento"
                id="visa"
                value={ pagamento }
                data-testid="visa-payment"
                onChange={ this.handleChangeInput }
              />
              Visa
            </label>
            <label htmlFor="mastercard">
              <input
                type="radio"
                name="pagamento"
                id="mastercard"
                value={ pagamento }
                data-testid="master-payment"
                onChange={ this.handleChangeInput }
              />
              Mastercard
            </label>
            <label htmlFor="elo">
              <input
                type="radio"
                name="pagamento"
                id="elo"
                value={ pagamento }
                data-testid="elo-payment"
                onChange={ this.handleChangeInput }
              />
              Elo
            </label>
          </div>
        </div>
        <button
          data-testid="checkout-btn"
          onClick={ this.handleIsFormValid }
        >
          Comprar
        </button>
        {clicked && !validForm
        && (<p data-testid="error-msg">Campos inválidos</p>)}
      </div>
    );
  }
}

FormCheckout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
