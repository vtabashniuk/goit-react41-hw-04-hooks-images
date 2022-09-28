import { fetchImages } from 'api/api';

export const getImageCollection = async (query, pageNumber) => {
  const response = await fetchImages(query, pageNumber);
  const { data } = response;
  return {
    totalHits: data.totalHits,
    images: data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id: String(id),
      tags,
      webformatURL,
      largeImageURL,
    })),
  };
};
