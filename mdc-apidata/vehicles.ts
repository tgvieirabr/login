import { api } from './api';

export async function getVehiclesList(
    page: number,
    idUser: number,
    limit: number,
    searchTxt?: string,
) {
    let baseQuery = `?page=${page}&limit=${limit}&idUser=${idUser}`;
    baseQuery += searchTxt ? `&searchTxt=${searchTxt}` : '';

    try {
        const { data } = await api.get(`/vehicles${baseQuery}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function updateRevendaPro(
    idUser: number
) {
    try {
        const { data } = await api.post(`/revendaPro/vehicles/refresh?idUser=${idUser}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function updateClienteRevendaPro(
    idUser: number
) {
    try {
        const { data } = await api.post(`/revendaPro/customers/refresh?idUser=${idUser}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}
