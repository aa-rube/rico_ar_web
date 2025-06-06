import axios from "axios";

export async function deleteListItem(id: number) {
    try {
        const res = await axios.delete(`url/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}
