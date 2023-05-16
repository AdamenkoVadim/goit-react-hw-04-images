import css from "components/Modal/Modal.module.css"
import { Component } from "react"
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render(){
  return (
    <div className={css.overlay} onClick= {this.handleBackDropClick}>
      <div className={css.modal}>
        <img src={this.props.largeImageURL} alt="" />
      </div>
    </div>
  )}
}

Modal.propTypes = {
  onClose: PropTypes.func,
 
};
