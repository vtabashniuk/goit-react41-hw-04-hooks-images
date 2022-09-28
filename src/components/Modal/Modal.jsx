import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  escapeKeyDownHandler = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  backdropClickHandler = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.escapeKeyDownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escapeKeyDownHandler);
  }

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.backdropClickHandler}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.defaultProps = { onClose: () => {} };

Modal.propTypes = { onClose: PropTypes.func };
