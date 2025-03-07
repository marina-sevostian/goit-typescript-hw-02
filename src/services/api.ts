import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const ACCESS_KEY = 'wcipTDT0gQ5f8bGf9IC8oW4J3dj1X5NrTL_7eIaSMEU';

const fetchImages = async (query, page = 1) => {
  const params = {
    query,
    page: page,
    per_page: 9,
    client_id: ACCESS_KEY,
  };
  const { data } = await axios.get('search/photos', { params });
  return data;
};
export default fetchImages;
