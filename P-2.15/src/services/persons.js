

import axios from 'axios';
const baseUrl = '/api/persons';


const getAll = () => (
    axios
        .get(baseUrl)
        .then(response => response.data)
);


const create = (name, number) => (
    axios
        .post(baseUrl, {name, number})
        .then(response => response.data)
);


const remove = id => axios.delete(`${baseUrl}/${id}`);


const update = (id, updatedPerson) => (
    axios
        .put(`${baseUrl}/${id}`, updatedPerson)
        .then(response => response.data)
);

export default {getAll, create, remove, update};