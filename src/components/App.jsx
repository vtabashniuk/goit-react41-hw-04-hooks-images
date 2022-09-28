import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImageCollection } from 'utils/getImageCollection';
import { INITIAL_STATE } from 'constants/initialState';

export class App extends Component {
  state = {
    imageRequest: '',
    imageGallery: [],
    isLoad: false,
    pageNumber: 1,
    maxPageNumber: null,
  };

  onSubmit = value => {
    this.setState({ ...INITIAL_STATE, imageRequest: value });
  };

  onClick = async () => {
    const { imageRequest, pageNumber, maxPageNumber } = this.state;
    if (pageNumber <= maxPageNumber) {
      await this.imagesCollectionHandler(imageRequest, pageNumber);
    }
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
    const { imageGallery, isLoad, maxPageNumber, pageNumber } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoad && 'LOADING...>>>...'}
        {imageGallery.length > 0 && (
          <ImageGallery
            gallery={imageGallery}
            onClick={this.onClick}
            disableLoadMoreBtn={pageNumber > maxPageNumber}
          />
        )}
      </>
    );
  }
}
