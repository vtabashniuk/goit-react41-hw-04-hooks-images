import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImageCollection } from 'utils/getImageCollection';
import { Modal } from './Modal/Modal';
import { Grid } from 'react-loader-spinner';
import { useState, useEffect } from 'react';

export const App = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [imageQuery, setImageQuery] = useState('');
  const [imageGallery, setImageGallery] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(0);
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalImage, setModalImage] = useState({});

  const toggleModal = () => {
    setIsModalShow(prevState => !prevState);
    setModalImage({});
  };

  const onSubmit = value => {
    setImageQuery(value);
    setImageGallery([]);
    setPageNumber(1);
  };

  const loadMore = () => {
    if (pageNumber < maxPageNumber) {
      setPageNumber(state => state + 1);
    }
  };

  const onImageClickHandler = id => {
    toggleModal();
    const { largeImageURL, tags } = imageGallery.find(item => id === item.id);
    setModalImage({ src: largeImageURL, alt: tags });
  };

  const imageCollectionHander = async (imageQuery, pageNumber) => {
    const { images, totalHits } = await getImageCollection(
      imageQuery,
      pageNumber
    );
    setImageGallery(state => [...state, ...images]);
    setMaxPageNumber(Math.ceil(totalHits / 12));
    setIsLoad(state => !state);
  };

  useEffect(() => {
    if (imageQuery === '') {
      return;
    }
    setIsLoad(state => !state);
    imageCollectionHander(imageQuery, pageNumber);
  }, [imageQuery, pageNumber]);

  return (
    <>
      {isModalShow && (
        <Modal onClose={toggleModal}>
          <img src={modalImage.src} alt={modalImage.alt} />
        </Modal>
      )}
      <Searchbar onSubmit={onSubmit} />
      {isLoad && (
        <Modal>
          <Grid
            height="80"
            width="80"
            color="#3f51b5"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Modal>
      )}
      {imageGallery.length > 0 && (
        <ImageGallery
          gallery={imageGallery}
          loadMore={loadMore}
          onImageClick={onImageClickHandler}
          disableLoadMoreBtn={pageNumber === maxPageNumber}
        />
      )}
    </>
  );
};
