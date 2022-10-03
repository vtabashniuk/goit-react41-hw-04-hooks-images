import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const escapeKeyDownHandler = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const backdropClickHandler = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', escapeKeyDownHandler);
    return () => {
      window.removeEventListener('keydown', escapeKeyDownHandler);
    };
  });

  return createPortal(
    <div className="Overlay" onClick={backdropClickHandler}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

Modal.defaultProps = { onClose: () => {} };

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element.isRequired,
};
