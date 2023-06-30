import { api } from '../services/api';

interface XMLBodyProps {
    base64: string;
    idUser?: number;
}

export async function userFavoriteArt(
    idUser: number,
    idArt: number,
    option: boolean,
) {
    try {
        const { data } = await api.patch(
            `/users/favorite/art?idUser=${idUser}&idArt=${idArt}&isFavorite=${option}`,
        );
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function userPaymentArt(idUser: number, idArt: number) {
    try {
        const { data } = await api.patch(
            `/arts/buy?idUser=${idUser}&idArt=${idArt}`,
        );
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

// export async function userPaymentArt(idUser: number, idArt: number) {
//     try {
//         const { data } = await api.patch(
//             `/users/purchase/art?idUser=${idUser}&idArt=${idArt}`,
//         );
//         return data;
//     } catch ({ response: { data } }) {
//         return data;
//     }
// }

export async function importWithXml(body: XMLBodyProps) {
    try {
        const { data } = await api.post(`/users/import`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getBirthday(date: string, type: 'last_days' | 'all', idUser: number) {
    try {
        const { data } = await api.get(
            `/customers/birthday?birthDate=${date}&type=${type}&idUser=${idUser}`,
        );
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}
