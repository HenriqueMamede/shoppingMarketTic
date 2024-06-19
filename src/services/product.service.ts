import { ProductProps } from "../app/interfaces/Produtc";
import http from "../http-common";

const findAll = async (type: string) => {
  if (type) {
    const response = await http.get<ProductProps[]>(`/products?_sort=price`);

    return type === "desc" ? response.data.reverse() : response.data;
  }
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

const findSortPrice = async () => {
  const response = await http.get<ProductProps[]>(`/products?_sort=price`);
  return response.data;
};

const ProductService = {
  findAll,
  findById,
  findByName,
  findSortPrice,
};

export default ProductService;
