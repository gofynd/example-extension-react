import axios from "axios";
import { getCompany } from "../helper/utils";
import urlJoin from "url-join";

axios.interceptors.request.use((config) => {
  config.headers["x-company-id"] = getCompany();
  return config;
});

const EXAMPLE_MAIN_URL = window.location.origin;

const ProductService = {
  getAllProducts() {
    return axios.get(urlJoin(EXAMPLE_MAIN_URL, '/api/products'));
  },
  getAllApplicationProducts(params = {}) {
    return axios.get(urlJoin(EXAMPLE_MAIN_URL, `/api/products/application/${params.application_id}`));
  }
};

export default ProductService;
