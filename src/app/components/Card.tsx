import { Product } from "../interfaces/Produtc";
import Button from "./Button";

const Card = ({ item }: Product) => {
  return (
    <div
      key={item.id}
      className="flex h-96 w-64 flex-col justify-center rounded-2xl bg-white p-2"
    >
      <div className="flex justify-center">
        <img
          src={`http://localhost:5173/assets/products/${item.image}.jpg`}
          alt={item.name}
          className="h-40 rounded-t-lg object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="mb-2 flex items-center justify-center">
          <h3 className="text-center text-lg font-bold">{item.name}</h3>
        </div>

        <div className="flex items-center justify-center">
          <span className="text-gray-700">R$ {item.price}</span>
        </div>
        <Button>Adicionar ao Carrinho</Button>
      </div>
    </div>
  );
};

export default Card;
