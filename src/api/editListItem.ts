import axios from "axios";

type EditListItem = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
}

export async function editListItem(itemInfo: EditListItem) {

    try {
        return await axios.put(`url`, itemInfo);
    } catch (err) {
        throw err;
    }
}
