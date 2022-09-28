import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({
  gallery,
  loadMore,
  disableLoadMoreBtn,
  onImageClick,
}) => {
  return (
    <>
      <ul className="ImageGallery">
        {gallery.map(item => (
          <ImageGalleryItem
            key={item.id}
            imageItem={item}
            onClick={onImageClick}
          />
        ))}
      </ul>
      {!disableLoadMoreBtn && (
        <Button type={'button'} label={'Load more...'} onClick={loadMore} />
      )}
    </>
  );
};

ImageGallery.defaultProps = {
  loadMore: () => {},
  onImageClick: () => {},
  disableLoadMoreBtn: true,
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
  loadMore: PropTypes.func,
  onImageClick: PropTypes.func,
  disableLoadMoreBtn: PropTypes.bool,
};
