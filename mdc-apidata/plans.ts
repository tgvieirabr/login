import { api } from '../services/api';

interface CreatePlansProps {
    name: string;
    price: number;
    status: string;
    amountArts: number;
    amountPosts: number;
    isMain: boolean,
}

export async function getPlans(
    page: number,
    searchName?: string,
    searchStatus?: string,
) {
    try {
        const { data } = await api.get(
            `/plans?limit=10&page=${page}${
                searchName && `&name=${searchName}`
            }${searchStatus && `&status=${searchStatus}`}`,
        );
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function createPlans(body: CreatePlansProps) {
    try {
        const { data } = await api.post('/plans', body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function updatePlans(body: CreatePlansProps, id: number) {
    try {
        const { data } = await api.put(`/plans?idPlan=${id}`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function deletePlans(id: number, idPlanReference: number) {
    try {
        const { data } = await api.delete(`/plans?idPlan=${id}&idPlanReference=${idPlanReference}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}


export async function getPlansDetails(idUser: number) {
    try {
        const { data } = await api.get(`/plans/details?idUser=${idUser}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}
