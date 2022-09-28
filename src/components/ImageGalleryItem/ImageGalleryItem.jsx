import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ imageItem, onClick }) => {
  const { id, tags, webformatURL } = imageItem;
  return (
    <li className="ImageGalleryItem" onClick={() => onClick(id)}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.defaultProps = { onClick: () => {} };

ImageGalleryItem.propType = {
  imageItem: PropTypes.exact({
    tags: PropTypes.string,
    webformatURL: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};
