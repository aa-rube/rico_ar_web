import { useNavigate } from "react-router-dom";
import EveryProduct from "./EveryProduct";
import "./productStyles.scss";

type ItemsComponentType = {
  items: any;
  cart: any;
  setCart: any;
  chatId: number;
};

const Products = ({ items, cart, setCart, chatId }: ItemsComponentType) => {
  const navigate = useNavigate();

  const handleProductClick = (item: any) => {
  //  navigate(`/product-details/${item.id}`,{state: {...item}});
  };

  return (
    <div className="items-container">
      {items?.map((item: any) => {
        return (
          <EveryProduct
          //  onClick={handleProductClick}
            product={item}
            key={item?.id}
            cart={cart}
            setCart={setCart}
            chatId={chatId}
          />
        );
      })}
    </div>
  );
};

export default Products;
