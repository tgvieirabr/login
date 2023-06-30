import { api } from './api';

interface UpdatePageProps {
    namePage: string,
    keyPage: string,
    accessToken: string,
    idUser: number,
}

export async function getPages(idUser: number) {
    try {
        const { data } = await api.get(`/configurations?page=1&limit=50&idUser=${idUser}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function updatePage(body: UpdatePageProps) {
    try {
        const { data } = await api.patch('/configurations', body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}
