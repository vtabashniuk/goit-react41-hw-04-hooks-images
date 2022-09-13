import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'api/api';

export class App extends Component {
  state = {
    imageRequest: '',
    imageGallery: [],
    isLoad: false,
  };

  onSubmit = value => {
    this.setState({ imageRequest: value });
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.imageRequest !== this.state.imageRequest) {
      try {
        const response = await getImages(this.state.imageRequest);
        const { data } = response;
        this.setState(prevState => {
          return { imageGallery: [...prevState.imageGallery, ...data.hits] };
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return <Searchbar onSubmit={this.onSubmit} />;
  }
}
