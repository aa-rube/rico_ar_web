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

export let currency = "$";