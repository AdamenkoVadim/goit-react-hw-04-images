import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <div className = {css.buttonWrapper}>
      <button className={css.button} type="button" onClick={loadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};