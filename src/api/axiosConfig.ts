import axios from "axios";

export const api = axios.create({
    baseURL: 'https://example.com/api', // Это лишь пример
    headers: {
        'Content-Type': 'application/json',
    },
});
