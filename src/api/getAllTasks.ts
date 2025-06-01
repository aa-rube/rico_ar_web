import axios from "./index";

export async function getAllTasks() {
    try {
        const res = await axios.get('/tasks');
        return res.data;
    } catch (err) {
        throw err;
    }

};
