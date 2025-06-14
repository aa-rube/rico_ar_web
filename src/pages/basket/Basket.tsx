import {useLayoutEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {isTimeInRange, MethodType, request, currency} from "../../data/data";
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
            fontSize: '18px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            background: active ? 'linear-gradient(#202731, #2C2F36)' : 'linear-gradient(#202731, #1F242C)',
            color: active ? 'white' : '#ffffff',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '100px'
        }}
    >
        <span style={{fontSize: '22px', marginBottom: '8px'}}>{icon}</span>
        <span style={{fontSize: '20px', fontWeight: '500'}}>{label}</span>
    </button>
);

export default function Basket({userData}: { userData: any }) {
    const chatId =
        userData?.id ??
        window.Telegram?.WebApp?.initDataUnsafe?.user?.id ??
        null;

    const navigate = useNavigate();
    const [cart, setCart] = useState<any>();
    const [paymentMethod, setPaymentMethod] = useState<number>(2); // 1 - CASH, 2 - CRYPTO

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
            {chat_id: chatId},
            (result) => setCart(result)
        );
    };

    useLayoutEffect(() => {
        if (chatId) getCartData();
    }, [chatId]);

    return (
        <div className="basket__container">
            <div className="basket__first_child">
                <div className="header">
                    <h2>TOTAL</h2>
                    <button onClick={goToHome}>BACK</button>
                </div>

                <div className="basket-items_container">
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
                        active={paymentMethod === 2}
                        onClick={() => setPaymentMethod(2)}
                        icon="₿"
                        label="Crypto"
                    />

                    <PaymentMethodButton
                        active={paymentMethod === 1}
                        onClick={() => setPaymentMethod(1)}
                        icon="💵"
                        label="Cash"
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
                            fontSize: '25px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        BUY
                    </button>
                ) : (
                    <p className="description">
                        Заказы принимаются с 10:00 до 18:00. Спасибо!
                    </p>
                )}
            </div>

            <div className="contact-info">
                <p className="number_title">Contact: </p>
                <p className="number">@weed_gid</p>
            </div>
        </div>
    );
}