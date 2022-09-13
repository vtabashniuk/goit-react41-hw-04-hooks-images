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
        <Form autoComplete="off" className="Form">
          <button type="submit" className="Button">
            <span className="Button-label">Search</span>
          </button>
          <Field
            className="Input"
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
