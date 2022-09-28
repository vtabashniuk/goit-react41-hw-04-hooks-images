import PropTypes from 'prop-types';

export const Button = ({ type, label, loadMore }) => {
  return (
    <button className="Button" type={type} onClick={loadMore}>
      {label}
    </button>
  );
};

Button.defaultProps = { type: 'button', onClick: () => {} };

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
