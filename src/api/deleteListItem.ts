import axios from "axios";

export function deleteListItem(id: number) {
    return axios.delete(`url/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}
