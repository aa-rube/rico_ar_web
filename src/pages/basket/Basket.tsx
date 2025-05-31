import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTimeInRange, MethodType, request, currency } from "../../data/data";
import BasketProduct from "./basketProduct/BasketProduct";

// Компонент стилизованной кнопки оплаты
const PaymentMethodButton = ({
                               active,
                               onClick,
                               icon,
                               label
                             }: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) => (
    <button
        onClick={onClick}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 8px',
          background: active ? 'linear-gradient(#202731, #1F242C)' : 'linear-gradient(#4A5C54, #262c35)',
          color: active ? 'white' : '#333',
          border: active ? 'none' : '1px solid #ddd',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: active ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
          minWidth: '100px'
        }}
    >
      <span style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</span>
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{label}</span>
    </button>
);

export default function Basket({ userData }: { userData: any }) {
  const chatId =
      userData?.id ??
      window.Telegram?.WebApp?.initDataUnsafe?.user?.id ??
      null;

  const navigate = useNavigate();
  const [cart, setCart] = useState<any>();
  const [paymentMethod, setPaymentMethod] = useState<number>(1); // 1 - CASH, 2 - CRYPTO

  const goToHome = () => navigate("/home");
  const continueBuying = () => navigate("/placeOrder");

  const handleSubmitOrder = () => {
    request(MethodType.POST, "order", {
      chatId,
      paymentMethod
    }, (result) => {
      if (result.success) {
        window.Telegram?.WebApp?.close?.();
      } else {
        console.error("Ошибка при оформлении заказа:", result.error);
      }
    });
  };

  const getCartData = () => {
    request(
        MethodType.POST,
        "cart",
        { chat_id: chatId },
        (result) => setCart(result)
    );
  };

  useLayoutEffect(() => {
    if (chatId) getCartData();
  }, [chatId]);

  return (
      <div className="busket__container">
        <div className="busket__first_child">
          <div className="header">
            <h2>TOTAL</h2>
            <button onClick={goToHome}>BACK</button>
          </div>

          <div className="busket-items_container">
            {cart?.cartItems?.map((e: any) => (
                <BasketProduct
                    key={e.item_id}
                    chatId={chatId}
                    product={e}
                    setCart={setCart}
                />
            ))}
          </div>

          <div className="separator"></div>
          <p className="count">Total Staff: {cart?.total_quantity}</p>
          <h3 className="price">
            Total Amount: {currency} {cart?.total_price}
          </h3>

          {/* Блок выбора способа оплаты */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            margin: '20px 0',
            padding: '0 16px'
          }}>
            <PaymentMethodButton
                active={paymentMethod === 1}
                onClick={() => setPaymentMethod(1)}
                icon="💵"
                label="Наличные"
            />
            <PaymentMethodButton
                active={paymentMethod === 2}
                onClick={() => setPaymentMethod(2)}
                icon="₿"
                label="Криптовалюта"
            />
          </div>

          {isTimeInRange("00:00", "23:59") ? (
              <button
                  onClick={handleSubmitOrder}
                  style={{
                    width: '100%',
                    padding: '15px',
                    background: 'linear-gradient(#202731, #1F242C)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
              >
                ОФОРМИТЬ ЗАКАЗ
              </button>
          ) : (
              <p className="description">
                Заказы принимаются с 10:00 до 18:00. Спасибо!
              </p>
          )}
        </div>

        <div className="contact-info">
          <p className="number_title">Контакты: </p>
          <p className="number">@weed_gid</p>
        </div>
      </div>
  );
}