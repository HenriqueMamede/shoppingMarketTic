import { ProductProps } from "../app/interfaces/Produtc";
import http from "../http-common";

const findAll = async () => {
  const response = await http.get<ProductProps[]>("/products");
  return response.data;
};

const findById = async (id: number) => {
  const response = await http.get<ProductProps>(`/products/${id}`);
  return response.data;
};

const findByName = async (name: string) => {
  const response = await http.get<ProductProps[]>(`/products?name=${name}`);
  return response.data;
};

const ProductService = {
  findAll,
  findById,
  findByName,
};

export default ProductService;
