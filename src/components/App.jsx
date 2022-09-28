import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImageCollection } from 'utils/getImageCollection';
import { INITIAL_STATE } from 'constants/initialState';
import { Modal } from './Modal/Modal';
import { Grid } from 'react-loader-spinner';

export class App extends Component {
  state = {
    imageRequest: '',
    imageGallery: [],
    isLoad: false,
    isModalShow: false,
    pageNumber: 1,
    maxPageNumber: null,
    modalImage: {},
  };

  onSubmit = value => {
    this.setState({ ...INITIAL_STATE, imageRequest: value });
  };

  loadMore = async () => {
    const { imageRequest, pageNumber, maxPageNumber } = this.state;
    if (pageNumber <= maxPageNumber) {
      await this.imagesCollectionHandler(imageRequest, pageNumber);
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalShow: !prevState.isModalShow,
      modalImage: {},
    }));
  };

  imagesCollectionHandler = async (imageRequest, pageNumber) => {
    const { isLoad } = this.state;
    this.setState({ isLoad: !isLoad });
    const { images, totalHits } = await getImageCollection(
      imageRequest,
      pageNumber
    );
    try {
      this.setState(prevState => ({
        imageGallery: [...prevState.imageGallery, ...images],
        isLoad: !prevState.isLoad,
        pageNumber: prevState.pageNumber + 1,
        maxPageNumber: Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  onImageClickHandler = id => {
    this.toggleModal();
    const { imageGallery } = this.state;
    const { largeImageURL, tags } = imageGallery.find(item => id === item.id);
    this.setState({ modalImage: { src: largeImageURL, alt: tags } });
  };

  async componentDidUpdate(_, prevState) {
    const { imageRequest, pageNumber } = this.state;
    if (prevState.imageRequest !== imageRequest) {
      try {
        this.imagesCollectionHandler(imageRequest, pageNumber);
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const {
      imageGallery,
      isLoad,
      maxPageNumber,
      pageNumber,
      isModalShow,
      modalImage,
    } = this.state;
    return (
      <>
        {isModalShow && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImage.src} alt={modalImage.alt} />
          </Modal>
        )}
        <Searchbar onSubmit={this.onSubmit} />
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
            loadMore={this.loadMore}
            onImageClick={this.onImageClickHandler}
            disableLoadMoreBtn={pageNumber > maxPageNumber}
          />
        )}
      </>
    );
  }
}
