import axios from 'axios';

export const getImages = async query => {
  try {
    return await axios.get('https://pixabay.com/api/', {
      params: {
        key: '22416794-3b1c3083ab7ce728d60190093',
        q: query,
        page: 1,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
  } catch (error) {
    console.log(error);
    }
};
