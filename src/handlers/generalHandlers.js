import axios from "axios";

const getInitizlizedApi = () => {
  return axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json",
    withCredentials: false,
    timeout: 100000,
  });
};

const handleResponse = (response) => {
  try {
    const responseBodyJson = {};
    responseBodyJson.status = response.status;
    responseBodyJson.data = response.data;
    responseBodyJson.message = response.message;

    return responseBodyJson ? responseBodyJson : null;
  } catch (error) {
    console.log(error);
  }
};

const dataGet = (url, headers) => {
  return getInitizlizedApi()
    .get(url, { headers })
    .then(
      (response) => handleResponse(response),
      (error) => {
        throw error.response;
      }
    );
};

const dataPost = (url, data, headers) => {
  return getInitizlizedApi()
    .post(url, data, { headers })
    .then(
      (response) => handleResponse(response),
      (error) => {
        throw error.response;
      }
    );
};

const dataPut = (url, data, headers) => {
  return getInitizlizedApi()
    .put(url, data, { headers })
    .then(
      (response) => handleResponse(response),
      (error) => {
        throw error.response;
      }
    );
};

const dataDelete = (url, data, headers) => {
  return getInitizlizedApi()
    .delete(url, data, { headers })
    .then(
      (response) => handleResponse(response),
      (error) => {
        throw error.response;
      }
    );
};
export default {
  getInitizlizedApi,
  dataGet,
  dataPost,
  dataPut,
  dataDelete,
};
