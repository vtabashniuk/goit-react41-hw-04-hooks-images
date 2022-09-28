import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({ gallery, onClick, disableLoadMoreBtn }) => {
  return (
    <>
      <ul className="ImageGallery">
        {gallery.map(item => (
          <ImageGalleryItem key={item.id} imageItem={item} />
        ))}
      </ul>
      {!disableLoadMoreBtn && (
        <Button type={'button'} label={'Load more...'} loadMore={onClick} />
      )}
    </>
  );
};

ImageGallery.defaultProps = { onClick: () => {}, disableLoadMoreBtn: true };

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func,
  disableLoadMoreBtn: PropTypes.bool,
};
