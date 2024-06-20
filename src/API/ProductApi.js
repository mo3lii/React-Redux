import axios from "axios";

const baseURL = "http://localhost:8099/products";

const getAllProducts = () => axios.get(baseURL);
const getById = (id) => axios.get(`${baseURL}/${id}`);
const addProduct = (product) => axios.post(baseURL, product);
const deleteProduct = (productId) => axios.delete(`${baseURL}/${productId}`);
const editProduct = (productId, product) =>
  axios.put(`${baseURL}/${productId}`, product);
export { getAllProducts, getById, addProduct, deleteProduct, editProduct };
