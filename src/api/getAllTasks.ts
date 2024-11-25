import axios from "./index";

export function getAllTasks() {
     return axios.get('/tasks')
         .then(res => res.data)
         .catch(err => {
             throw err;
         })

};
