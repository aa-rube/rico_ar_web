export const initialData = JSON.parse(`{
    "items": [
        {
            "id": 1,
            "name": "Меренговый рулет",
            "description": "Описание товара 1",
            "price": 400.0,
            "category": {
                "id": "desert",
                "name": "Категория 1"
            },
            "images": ["https://samsa.ucoz.ae/_sh/00/25b.jpg?v=569"]
        },
        {
            "id": 2,
            "name": "Компот Домашний 0,5л",
            "description": "Описание товара 2",
            "price": 15.0,
            "category": {
                "id": "napitki",
                "name": "Категория 2"
            },
            "images": ["https://samsa.ucoz.ae/_sh/00/26b.jpg?v=886"]
        },
        {
            "id": 3,
            "name": "Товар 3",
            "description": "Описание товара 3",
            "price": 300.0,
            "category": {
                "id": "category3",
                "name": "Категория 3"
            },
            "images": ["image4.jpg"]
        },
        {
            "id": 4,
            "name": "Товар 4",
            "description": "Описание товара 4",
            "price": 400.0,
            "category": {
                "id": "category4",
                "name": "Категория 4"
            },
            "images": ["image5.jpg"]
        }
    ],
    "categories": [
        {
            "id": "sup",
            "name": "Супы",
            "image": "../public/images/sup.jpg"
        },
        {
            "id": "garyachi",
            "name": "Горячие блюда",
            "image": "../public/images/garyachi.jpg"
        },
        {
            "id": "muchni",
            "name": "Мучные изделия",
            "image": "../public/images/muchni.jpg"
        },
        {
            "id": "desert",
            "name": "Десерты",
            "image": "../public/images/desert.webp"
        },
        {
            "id": "napitki",
            "name": "Напитки",
            "image": "../public/images/napitki.jpg"
        }
    ]
}`);

export enum MethodType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const request = (
  method: MethodType,
  requestUrl: string,
  body: any,
  callback = (result: any) => {}
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(body);

  interface requestOptionsType {
    method?: MethodType;
    headers?: Headers;
    [key: string]: any;
  }

  const requestOptions: requestOptionsType = {
    method: method,
    headers: myHeaders,
  };

  if (method !== MethodType.GET) {
    requestOptions.body = raw;
  }
  const url = "https://vkusbot.ru/vkusnaya_argentina/shop/" + requestUrl;

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
};

export const isTimeInRange = (startTime: string, endTime: string) => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = startHour * 60 + startMinute; // Start time in minutes
  const end = endHour * 60 + endMinute; // End time in minutes

  if (start <= end) {
    return currentTime >= start && currentTime <= end;
  } else {
    return currentTime >= start || currentTime <= end;
  }
};

export let currency = "egp.";