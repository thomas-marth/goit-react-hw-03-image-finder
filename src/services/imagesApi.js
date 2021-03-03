import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/api";
const apiKey = "16819410-e96e43f9ec4d021c44a0ec2b8";

const fetchImagesWithQuery = (searchQuery, page = 1) => {
  return axios(
    `/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => response.data.hits);
};

// eslint-disable-next-line
export default { fetchImagesWithQuery };
