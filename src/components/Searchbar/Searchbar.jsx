import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ query }, actions) => {
    onSubmit(query);
    actions.resetForm();
  };

  return (
    <header className="Searchbar">
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form autoComplete="off" className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <Field
            className="SearchForm-input"
            type="text"
            autoFocus
            autoComplete="off"
            placeholder="Search images and photos"
            name="query"
          />
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
