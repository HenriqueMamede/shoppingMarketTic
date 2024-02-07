import Button from "./Button";

const Card = () => {
  return (
    <div className="w-64 rounded-2xl bg-blue-200 p-2">
      <div>
        <img
          src="http://localhost:5173/assets/products/tenis.jpg"
          alt="Product image"
          className="w-full rounded-t-lg object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-center">
          <h3 className="text-lg font-bold">Nome do Produto</h3>
        </div>

        <div className="flex items-center justify-center">
          <span className="text-gray-700">R$ 149,99</span>
        </div>
        <Button>Adicionar ao Carrinho</Button>
      </div>
    </div>
  );
};

export default Card;
