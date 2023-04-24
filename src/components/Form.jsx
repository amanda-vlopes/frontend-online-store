import PropTypes from 'prop-types';
import { React, Component } from 'react';

class Form extends Component {
  state = {
    email: '',
    rating: '',
    text: '',
  };

  submitReview = () => {
    const { email, rating, text } = this.state;
    const { idDoProduto } = this.props;
    const obj = {
      avaliacoes: JSON.parse(localStorage.getItem(idDoProduto)) || [],
    };
    obj.avaliacoes.push({
      email,
      rating,
      text });
    localStorage.setItem(idDoProduto, JSON.stringify(obj.avaliacoes));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { idDoProduto } = this.props;
    const { email, rating, text } = this.state;
    console.log(localStorage.getItem(idDoProduto));
    return (
      <>
        <form>
          <input
            type="email"
            name="email"
            data-testid="product-detail-email"
            placeholder="Email"
            value={ email }
            onChange={ this.handleChange }
            style={ { color: 'black' } }
          />
          <label htmlFor="">
            1
            <input
              type="radio"
              name="rating"
              value="1"
              data-testid="1-rating"
              onChange={ this.handleChange }
              checked={ rating === '1' }
            />
          </label>
          <label htmlFor="">
            2
            <input
              type="radio"
              name="rating"
              value="2"
              data-testid="2-rating"
              onChange={ this.handleChange }
              checked={ rating === '2' }
            />
          </label>
          <label htmlFor="">
            3
            <input
              type="radio"
              name="rating"
              value="3"
              data-testid="3-rating"
              onChange={ this.handleChange }
              checked={ rating === '3' }
            />
          </label>
          <label htmlFor="">
            4
            <input
              type="radio"
              name="rating"
              value="4"
              data-testid="4-rating"
              onChange={ this.handleChange }
              checked={ rating === '4' }
            />
          </label>
          <label htmlFor="">
            5
            <input
              type="radio"
              name="rating"
              value="5"
              data-testid="5-rating"
              onChange={ this.handleChange }
              checked={ rating === '5' }
            />
          </label>
          <textarea
            name="text"
            data-testid="product-detail-evaluation"
            value={ text }
            onChange={ this.handleChange }
            style={ { color: 'black' } }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.submitReview }
          >
            Avaliar
          </button>
        </form>
        <div>
          {JSON.parse(localStorage.getItem(idDoProduto))?.map((element, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">
                {'Email: '}
                {element.email}
              </p>
              <p data-testid="review-card-rating">
                {'Rating: '}
                {element.rating}
              </p>
              <p data-testid="review-card-evaluation">
                {'Comentário: '}
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
