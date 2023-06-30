import { api } from './api';

interface ClientsTokenProps {
    email: string;
    password: string;
}

interface ClientsRecoverProps {
    email: string;
}

interface ClientsRefreshToken {
    refresh: string;
    type: string;
}

interface ClientsUpdateProps {
    email: string;
    name: string;
    photo: string;
    phone: string;
    signature?: string;
    defaultText?: string;
}

interface ClientProps {
    name: string;
    email: string;
    password?: string;
    photo: string;
    phone: string;
    address: string;
    complement: string;
    whatsapp?: string;
    tiktok: string;
    buyLimit: string;
    site: string;
    facebook: string;
    instagram: string;
    images: Array<string>;
    numberAddress: number;
    idPlan: number;
    document: string;
    district: string;
    cep: string;
    city: string;
    stateRegistration: string;
    technicianWhatsapp: string;
    technicianName: string;
    technicianEmail: string;
    signature?: string;
    stateAddress: string;
    defaultText?: string;
}

interface ClientChangePasswordProps {
    email: string;
    password: string;
}

export async function clientsToken(body: ClientsTokenProps) {
    try {
        const { data } = await api.post('/clients/token', body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function clientsRecover(body: ClientsRecoverProps) {
    try {
        const { data } = await api.post('/clients/recover', body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function clientsRefreshToken(body: ClientsRefreshToken) {
    try {
        const { data } = await api.post('/clients/refreshToken', body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function clientsUpdate(
    body: ClientsUpdateProps,
    id: number,
    typeUser: 'adm' | 'users',
) {
    try {
        const { data } = await api.put(
            `/client?type=${typeUser}&idReference=${id}`,
            body,
        );
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function clientsList(page: number, name?: string, email?: string, solicitation?: 'total' | 'pending') {
    let baseQuery = `/users?page=${page}&limit=10`;
    baseQuery += name ? `&name=${name}` : '';
    baseQuery += email ? `&email=${email}` : '';
    baseQuery += solicitation ? `&solicitation=${solicitation}` : '';

    try {
        const { data } = await api.get(baseQuery);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function deleteClient(idUser: number) {
    try {
        const { data } = await api.delete(`/users?idUser=${idUser}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function createClient(body: ClientProps) {
    try {
        const { data } = await api.post(`/users`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function editClient(
    body: ClientProps,
    idUser: number,
) {
    try {
        const { data } = await api.put(
            `/users?idUser=${idUser}`,
            body,
        );
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function clientChangePassword(body: ClientChangePasswordProps) {
    try {
        const { data } = await api.patch(`/clients/changePassword`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getTags(idUser: number, idVehicle: number) {
    try {
        const { data } = await api.get(`/users?idUser=${idUser}&idVehicle=${idVehicle}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}


export async function clientLogout(idCliente: number) {
    try {
        const { data } = await api.patch(`/users/logout?idUser=${idCliente}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function updtadeClientes(idCliente: number) {
    try {
        const { data } = await api.patch(`/users/logout?idUser=${idCliente}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}
