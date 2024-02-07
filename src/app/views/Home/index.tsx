import Card from "../../components/Card";
import { mockProdutos } from "../../../mock/listaProdutos";

const Home = () => {
  return (
    <div className="mb-36 mt-60 grid h-5/6 w-11/12 grid-cols-4 gap-4 overflow-x-auto">
      {mockProdutos?.map((product) => {
        return (
          <div key={product.id}>
            <Card item={product} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
