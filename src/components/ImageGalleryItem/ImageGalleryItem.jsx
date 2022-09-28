import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ imageItem }) => {
  const { tags, webformatURL } = imageItem;
  return (
    <li className="ImageGalleryItem">
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propType = {
  imageItem: PropTypes.exact({
    tags: PropTypes.string,
    webformatURL: PropTypes.string,
  }).isRequired,
};
