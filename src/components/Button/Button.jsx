import PropTypes from 'prop-types';

export const Button = ({ type, label, onClick }) => {
  return (
    <button className="Button" type={type} onClick={onClick}>
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
