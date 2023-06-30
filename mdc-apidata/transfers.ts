import { api } from './api';

export async function transfersList(periodStart: string, periodEnd: string, status: 'pending' | 'done') {
    try {
        const { data } = await api.get(`/transfers/finance?periodStart=${periodStart}&periodEnd=${periodEnd}&status=${status}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function changedTransferStatus(idUser: number, status: 'pending' | 'done' ) {
    const body = {
        idUser,
        status,
    }

    try {
        const { data } = await api.patch(`/transfers/changedStatus`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function userTransfersList(idUser: number) {
    try {
        const { data } = await api.get(`/transfers/financeUser?idUser=${idUser}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}
