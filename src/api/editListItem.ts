import axios from "axios";

type EditListItem = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
}

export function editListItem(itemInfo: EditListItem) {

    return axios.put(`url`, itemInfo )
        .then(res => res)
        .catch(err => {
            throw err;
        })
}
