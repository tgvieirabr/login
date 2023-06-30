import { api } from './api';

export async function getDashboardInfo(
    idUser?: number,
) {
    try {
        const { data } = await api.get('adm/dashboard');
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getUserList(page: number, limit: number, type: 'online' | 'recent') {
    let baseQuery = `/users?page=${page}&limit=${limit}&type=${type}`;

    try {
        const { data } = await api.get(baseQuery);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getPlansDashboard(period: string) {
    let baseQuery = `/plans/dashboard?period=${period}`;

    try {
        const { data } = await api.get(baseQuery);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getInvoicingDashboard(idUser: number, type: 'arts' | 'plans' | 'all') {
    let baseQuery = `/transfers/dashboard?idUser=${idUser}`;
    baseQuery += type && type !== 'all' ? `&type=${type}` : '';

    try {
        const { data } = await api.get(baseQuery);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getArtsDashboard(period: string) {
    let baseQuery = `/arts/used/dashboard?period=${period}`;

    try {
        const { data } = await api.get(baseQuery);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}


