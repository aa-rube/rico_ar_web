import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusketButton from "../../components/BusketButton/BusketButton";
import CategoriesComponent from "../../components/Categories/CategoriesComponent";
import Products from "../../components/Products/Products";
import SearchComponent from "../../components/Search/SearchComponent";
import {MethodType, request } from "../../data/data";
import "./homeStyles.css";

interface UserData {
  id: number | null;
}
interface HomeProps {
  userData: UserData;
}

function Home({ userData }: HomeProps) {
  /* --- ⚡ chatId берём из пропса или из initDataUnsafe --- */
  const chatId =
    userData?.id ??
    window.Telegram?.WebApp?.initDataUnsafe?.user?.id ??
    null;

  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [cart, setCart] = useState<any>(null);

  const handleClickBusketBtn = () => navigate("/busket");

  const onSearch = (value: string) => {
    request(
      MethodType.POST,
      "showcase/main/search",
      { search_phrase: value },
      (res: any) => {
        setCategories(res?.categories ?? []);
        setItems(res?.items ?? []);
      }
    );
  };

  const onCategorySelect = (category: string) => {
    request(
      MethodType.POST,
      "showcase/main/category",
      { category_id: category },
      (res: any) => setItems(res?.shopItems ?? [])
    );
  };

  useEffect(() => {
    /* Telegram ready */
    window.Telegram?.WebApp?.ready();

    if (chatId) {
      request(MethodType.GET, "showcase/main", {}, (res: any) => {
        setCategories(res?.categories ?? []);
        setItems(res?.items ?? []);
      });

      request(
        MethodType.POST,
        "cart",
        { chat_id: chatId },
        (result) => setCart(result)
      );
    }
  }, [chatId]);

  return (
    <div className="home-page__container">
      <div className="header__container">
        <SearchComponent onSearch={onSearch} />
      </div>

      <div className="home-page__body">
        <h2>BRANDS</h2>

        <CategoriesComponent
          categories={categories}
          onCategorySelect={onCategorySelect}
        />
        <h2>STAFF</h2>

        <Products
          chatId={chatId}
          items={items}
          cart={cart}
          setCart={setCart}
        />
      </div>

      <BusketButton
        title={`TOTAL ${cart?.total_quantity || 0}`}
        onClick={handleClickBusketBtn}
      />
    </div>
  );
}

export default Home;
