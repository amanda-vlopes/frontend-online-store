import PropTypes from 'prop-types';
import { React, Component } from 'react';
import './Form.css';

class Form extends Component {
  state = {
    email: '',
    rating: '',
    text: '',
    hasProblem: false,
  };

  submitReview = () => {
    const { email, rating, text } = this.state;
    const { idDoProduto } = this.props;
    const valida = !email || !rating;
    const obj = {
      avaliacoes: JSON.parse(localStorage.getItem(idDoProduto)) || [],
    };
    obj.avaliacoes.unshift({
      email,
      rating,
      text });
    if (valida) {
      this.setState({
        hasProblem: true,
      });
    } else {
      localStorage.setItem(idDoProduto, JSON.stringify(obj.avaliacoes));
      this.setState({
        hasProblem: false,
        email: '',
        rating: '',
        text: '',
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      hasProblem: false,
    });
  };

  render() {
    const { idDoProduto } = this.props;
    const { email, rating, text, hasProblem } = this.state;
    const formContent = [
      {
        type: 'email',
        name: 'email',
        placeholder: 'Email',
        dataTestid: 'product-detail-email',
        className: 'form__email',
      },
      {
        type: 'radio',
        name: 'rating',
        values: ['1', '2', '3', '4', '5'],
      },
      {
        type: 'textarea',
        name: 'text',
        dataTestid: 'product-detail-evaluation',
      },
    ];
    return (
      <>
        <form className="form__container">
          <div className="form__email-rating">
            {formContent.map((items) => {
              if (items.type === 'email') {
                return (
                  <input
                    key={ items.name }
                    type={ items.type }
                    name={ items.name }
                    data-testid={ items.dataTestid }
                    placeholder={ items.placeholder }
                    value={ email }
                    onChange={ this.handleChange }
                    style={ { color: 'black' } }
                    className={ items.className }
                  />
                );
              }
              if (items.type === 'radio') {
                return items.values.map((value) => (
                  <label key={ value }>
                    {value}
                    <input
                      type={ items.type }
                      name={ items.name }
                      value={ value }
                      data-testid={ `${value}-rating` }
                      onChange={ this.handleChange }
                      checked={ rating === value }
                    />
                  </label>
                ));
              }
              if (items.type === 'textarea') {
                return (
                  <textarea
                    key={ items.name }
                    name={ items.name }
                    data-testid={ items.dataTestid }
                    value={ text }
                    onChange={ this.handleChange }
                    style={ { color: 'black' } }
                  />
                );
              }
              return null;
            })}
          </div>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.submitReview }
          >
            Avaliar
          {hasProblem ? <p data-testid="error-msg">Campos inválidos</p> : ''}
          { hasProblem ? <p data-testid="error-msg">Campos inválidos</p> : ''}
        </form>

        <div>
          {JSON.parse(localStorage.getItem(idDoProduto))?.map((element, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">
                {/* {'Email: '} */}
                {element.email}
              </p>
              <p data-testid="review-card-rating">
                {/* {'Rating: '} */}
                {element.rating}
              </p>
              <p data-testid="review-card-evaluation">
                {/* {'Comentário: '} */}
                {element.text}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

Form.propTypes = {
  idDoProduto: PropTypes.string.isRequired,
};

export default Form;
