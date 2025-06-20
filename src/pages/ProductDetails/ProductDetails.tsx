import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BasketButton from "../../components/BasketButton/BasketButton";
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

  const handleClickToBasket = (e: any) => {
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

  const handleClickBasketBtn = () => {
    navigate("/basket");
  };

  return (
    <div className="product-details__container">
      <div className="basket__first_child">
        <div className="header">
          <h2>Детали</h2>
          <button onClick={goBack}>Продолжить покупки</button>
        </div>
      </div>
      <div className="image__container">
        <img
          src={productData?.images?.length ? productData?.images[0] : ""}
           style={{
             width: "100%",
             height:"100%",
             objectFit: "contain",
             paddingTop: "60px"
        }}
        />
        <div className="body">
          <p className="title">{productData.name}</p>
          <span className="category">{productData.category?.id}</span>
          <p className="price">
            Price: {currency} {productData.price}
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
        <button className="add-to-basket__button" onClick={handleClickToBasket}>
          {isLoading ? <div className="loader"></div> : `BUY`}
        </button>
      ) : (
        <div className="add-to-basket__container">
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
      <BasketButton
        title={`TOTAL (${cart?.total_quantity || 0})`}
        onClick={handleClickBasketBtn}
      />
    </div>
  );
}
