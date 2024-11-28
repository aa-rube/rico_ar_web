// Home.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusketButton from "../../components/BusketButton/BusketButton";
import CategoriesComponent from "../../components/Categories/CategoriesComponent";
import Products from "../../components/Products/Products";
import SearchComponent from "../../components/Search/SearchComponent";
import { initialData, MethodType, request } from "../../data/data";
import "./homeStyles.css";

interface UserData {
  id: number;
  // Add other properties if necessary
}

interface HomeProps {
  userData: UserData;
}

function Home({ userData }: HomeProps) {
  const chatId = userData?.id;
  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [cart, setCart] = useState<any>(null);

  const handleClickBusketBtn = () => {
    navigate("/busket");
  };

  const onSearch = (value: string) => {
    request(
      MethodType.POST,
      "showcase/main/search",
      { search_phrase: value },
      (response: any) => {
        setCategories(response?.categories ?? []);
        setItems(response?.items ?? []);
      }
    );
  };

  const onCategorySelect = (category: string) => {
    request(
      MethodType.POST,
      "showcase/main/category",
      { category_id: category },
      (response: any) => {
        setItems(response?.shopItems ?? []);
      }
    );
  };

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    } else {
      console.error("Telegram WebApp API недоступен.");
    }

    if (userData?.id) {
      request(MethodType.GET, "showcase/main", {}, (response: any) => {
        setCategories(response?.categories ?? initialData.categories ?? []);
        setItems(response?.items ?? initialData.items ?? []);
      });

      request(
        MethodType.POST,
        "cart",
        {
          chat_id: chatId,
        },
        (result: any) => setCart(result)
      );
    }
  }, [navigate, userData, chatId]);

  return (
    <div className="home-page__container">
      <div className="header__container">
        <SearchComponent onSearch={onSearch} />
      </div>
      <div className="home-page__body">
        <h2>Главная</h2>

        <CategoriesComponent
          categories={categories}
          onCategorySelect={onCategorySelect}
        />

        <Products
          chatId={userData?.id}
          items={items}
          cart={cart}
          setCart={setCart}
        />
      </div>
      <BusketButton
        title={`КОРЗИНА (${cart?.total_quantity || 0})`}
        onClick={handleClickBusketBtn}
      />
    </div>
  );
}

export default Home;
