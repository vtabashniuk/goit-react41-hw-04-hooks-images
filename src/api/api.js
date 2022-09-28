import axios from 'axios';

export const fetchImages = async (query, pageNumber) => {
  try {
    return await axios.get('https://pixabay.com/api/', {
      params: {
        key: '22416794-3b1c3083ab7ce728d60190093',
        q: query,
        page: pageNumber,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
