import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BusketButton from "../../components/BusketButton/BusketButton";
import { currency, MethodType, request } from "../../data/data";
import "./productStyles.scss";

export default function ProductDetails({ chatId }: { chatId: number }) {
  const { state }: any = useLocation();
  const navigate = useNavigate();

  /* --- ⚡ fallback --- */
  const realChatId =
    chatId ??
    window.Telegram?.WebApp?.initDataUnsafe?.user?.id ??
    null;

  const [productData, setProductData] = useState(state);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState<any>(0);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState<any>();

  useEffect(() => {
    request(MethodType.POST, "showcase/item", { item_id: state?.id }, setProductData);
  }, [state?.id]);

  useEffect(() => {
    if (!realChatId) return;

    request(
      MethodType.POST,
      "cart",
      { chat_id: realChatId },
      (result) => {
        const productCount =
          result?.cartItems.find((i: any) => i.item_id === productData.id)
            ?.quantity ?? 0;
        setCount(productCount);
        setPrice(productCount * productData.price);
        setCart(result);
      }
    );
  }, [realChatId, productData]);

  const goBack = () => navigate("/home");
  const addToCart = () => {
    request(
      MethodType.PUT,
      "cart",
      {
        chat_id: chatId,
        item_id: productData.id,
      },
      (result) => {
        const productCount =
          result?.cartItems.find((item: any) => item.item_id === productData.id)
            ?.quantity ?? 0;
        setCount(productCount);
        setPrice(productCount * productData.price);
        setCart(result);
      }
    );
  };

  const removeFromCart = () => {
    request(
      MethodType.DELETE,
      `cart/${chatId}/items/${productData.id}`,
      {},
      (result) => {
        const productCount =
          result?.cartItems.find((item: any) => item.item_id === productData.id)
            ?.quantity ?? 0;
        setCount(productCount);
        setPrice(productCount * productData.price);
        setCart(result);
      }
    );
  };

  const handleClickToBusket = (e: any) => {
    // navigate(`/basket/${productId}`, {
    //   state: { productId },
    e.stopPropagation();
    setIsLoading(true);
    setTimeout(() => {
      addToCart();
      setIsLoading(false);
    }, 1000);
    // });
  };

  const handleClickIncrement = (e: any) => {
    e.stopPropagation();
    setIsLoading(true);
    setTimeout(() => {
      addToCart();
      setIsLoading(false);
    }, 1000);
  };

  const handleClickDecrement = (e: any) => {
    e.stopPropagation();
    setIsLoading(true);
    setTimeout(() => {
      removeFromCart();
      setIsLoading(false);
    }, 1000);
  };

  const handleClickBusketBtn = () => {
    navigate("/busket");
  };

  return (
    <div className="product-details__container">
      <button
        onClick={goBack}
        className="close-icon__container"
      >
        <img
          src={require("../../images/back_arrow.svg").default}
          width={50}
          height={40}
        />
      </button>
      <div className="image__container">
        <img
          src={productData?.images?.length ? productData?.images[0] : ""}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        <div className="body">
          <p className="title">{productData.name}</p>
          <span className="category">{productData.category?.id}</span>
          <p className="price">
            Цена: {currency} {productData.price}
          </p>
          <p className="short_description">{productData.short_description}</p>
          <p className="description">{productData.description}</p>
        </div>
        {/*<div className="text__container">*/}
        {/*  <p className="title">{productData.name}</p>*/}
        {/*  <h1>*/}
        {/*   Цена:  {currency} {productData.price}*/}
        {/*  </h1>*/}

        {/*  <p>Описание: </p>*/}
        {/*  <p>{productData.description}</p>*/}
        {/*</div>*/}
      </div>
      {count === 0 ? (
        <button className="add-to-busket__button" onClick={handleClickToBusket}>
          {isLoading ? <div className="loader"></div> : `В корзину`}
        </button>
      ) : (
        <div className="add-to-busket__container">
          <p>
            {currency} {price}
          </p>

          <div className={`count_container ${count && "loading_buttons"}`}>
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <>
                <button onClick={handleClickDecrement}>-</button>
                <span>{count}</span>
                <button onClick={handleClickIncrement}>+</button>
              </>
            )}
          </div>
        </div>
      )}
      <BusketButton
        title={`КОРЗИНА (${cart?.total_quantity || 0})`}
        onClick={handleClickBusketBtn}
      />
    </div>
  );
}
