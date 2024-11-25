import { useEffect, useState } from "react";
import "./App.scss";
import { Routes } from "./routes/Routes";

function App() {
  const [userData, setUserData] = useState("");

  function parseUrlParams() {
    const params: any = {};
    const parser = document.createElement("a");
    parser.href = window.location.href;

    const hash = parser.hash.substring(1);
    const hashParams = new URLSearchParams(hash);

    const tgWebAppData = hashParams.get("tgWebAppData");
    if (!tgWebAppData) {
      console.error("tgWebAppData отсутствует в URL");
      return null;
    }

    const dataParams = new URLSearchParams(tgWebAppData);

    dataParams.forEach((value, key) => {
      params[key] = decodeURIComponent(value);
    });

    return params;
  }

  useEffect(() => {
    const params = parseUrlParams();
    if (params) {
      if (params.user) {
        try {
          const userJson = decodeURIComponent(params.user);
          const user = JSON.parse(userJson);
          setUserData(user);
        } catch (e) {
          console.error("Ошибка при разборе данных пользователя:", e);
        }
      } else {
        console.error("Параметр user отсутствует в tgWebAppData");
      }
    } else {
      console.error("Не удалось извлечь параметры из URL");
    }
  }, []);

  return (
    <div className="App">
      <Routes userData={userData} />
    </div>
  );
}

export default App;
