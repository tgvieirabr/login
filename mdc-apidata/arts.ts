import { api } from './api';

interface CreateArtsProps {
    title: string;
    storeName: string;
    colors: Array<string>;
    use: string;
    type: string;
    idEvents: Array<number>;
    isAllPlans: boolean,
    attachment: string;
    idPlan: number;
    price?: number;
    isFree: boolean;
    idAdm?: number;
    idUser?: number,
}

interface CreateUsedArtProps {
    dateSend: string,
    isFinished: boolean,
    idArt: number,
    idUser: number,
    idVehicle: number,
    isSend?: boolean,
    wasPublishedFromStock: boolean,
    type: string,
}

interface CreateUsedArtPropsWhatsapp {
    idArt: number;
    idUser: number;
    message: string;
}

interface UpdateUsedArtProps {
    dateSend: string,
    isFinished: boolean,
    idUser: number,
    idVehicle: number,
    isSend?: boolean,
    wasPublishedFromStock: boolean,
    type: string,
}

export async function getArtList(
    page: number,
    type: 'all' | 'favorite' | 'bought' | 'editing' | 'published' | 'scheduled',
    idUser?: number,
    searchTxt?: string,
    artType?: string,
    idEvent?: number,
    idsColors?: string,
    idAdm?: string,
    use?: string,
    status?: string,
) {
    let baseQuery = `/arts?page=${page}&limit=50&type=${type}`;
    baseQuery += searchTxt ? `&searchTxt=${searchTxt}` : '';
    baseQuery += idUser ? `&idUser=${idUser}` : '';
    baseQuery += idAdm ? `&idAdm=${idAdm}` : '';
    baseQuery += artType ? `&artType=${artType}` : '';
    baseQuery += idEvent ? `&idEvent=${idEvent}` : '';
    baseQuery += idsColors ? `&idsColors=${idsColors}` : '';
    baseQuery += use ? `&used=${use === 'Público' ? 'public' : (use === 'Privado' ? 'private' : '')}` : '';
    baseQuery += status ? `&status=${status === 'Ativado' ? 'actived' : (status === 'Bloqueado' ? 'blocked' : '')}` : '';

    try {
        const { data } = await api.get(baseQuery);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getArtListBirthDay(
    page: number,
    type: 'all' | 'favorite' | 'bought' | 'editing' | 'published' | 'scheduled',
    idUser?: number,
    searchTxt?: string,
    artType?: string,
    idEvent?: number,
    idsColors?: string,
    idAdm?: string,
    use?: string,
    status?: string,
) {
    let baseQuery = `/arts/birthday?page=${page}&limit=50&type=${type}`;
    baseQuery += searchTxt ? `&searchTxt=${searchTxt}` : '';
    baseQuery += idUser ? `&idUser=${idUser}` : '';
    baseQuery += idAdm ? `&idAdm=${idAdm}` : '';
    baseQuery += artType ? `&artType=${artType}` : '';
    baseQuery += idEvent ? `&idEvent=${idEvent}` : '';
    baseQuery += idsColors ? `&idsColors=${idsColors}` : '';
    baseQuery += use ? `&used=${use === 'Público' ? 'public' : (use === 'Privado' ? 'private' : '')}` : '';
    baseQuery += status ? `&status=${status === 'Ativado' ? 'actived' : (status === 'Bloqueado' ? 'blocked' : '')}` : '';

    try {
        const { data } = await api.get(baseQuery);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function createNewArt(body: CreateArtsProps) {
    try {
        const { data } = await api.post('/arts', body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function updateArt(idArt: number, body: CreateArtsProps) {
    try {
        const { data } = await api.put(`/arts?idArt=${idArt}`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function deleteArt(idArt: number) {
    try {
        const { data } = await api.delete(`/arts?idArt=${idArt}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getFavoritesArts(id: number) {
    try {
        const { data } = await api.get(`/arts/view?idUser=${id}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getArtsRecommended(idArt: number) {
    try {
        const { data } = await api.get(`/arts/recommended?idArt=${idArt}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function userImportArt(attachment: string, idUser: number) {
    const body = {
        attachment,
        idUser,
    };

    try {
        const { data } = await api.post(`/arts/import`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getArtsPending(idUser: number) {
    try {
        const { data } = await api.get(`/arts/orders?page=1&limit=50&idUser=${idUser}&status=pending`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function updateStatusArts(idArtOrder: number, status: 'aproved' | 'canceled') {
    try {
        const { data } = await api.patch(`/arts/orders/status?idArtOrder=${idArtOrder}&status=${status}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function createUsedArt(body: CreateUsedArtProps) {
    try {
        const { data } = await api.post(`/arts/used`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function createUsedArtWhatsapp(body: CreateUsedArtPropsWhatsapp) {
    try {
        const { data } = await api.post(`/arts/used/birthday`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getTemplatePreview(
    idArt: number,
    idUser: number,
    idVehicle?: number,
    logoClient?: string,
    photoVehicle?: string,
    message?: string,
    birthDay?: string,
    firstName?: string,
    isEnabledRemoveBg?: boolean,
) {
    try {
        let baseQuery = `/arts/used/view?idArt=${idArt}&idUser=${idUser}`;
        baseQuery += idVehicle ? `&idVehicle=${idVehicle}` : '';
        baseQuery += photoVehicle ? `&photoVehicle=${photoVehicle}` : '';
        baseQuery += logoClient ? `&logoClient=${logoClient}` : '';
        baseQuery += birthDay ? `&birthDay=${birthDay}` : '';
        baseQuery += firstName ? `&firstName=${firstName}` : '';

        const { data } = await api.patch(baseQuery, { message, isRemoveBg: isEnabledRemoveBg });
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function updateEditArt(idArtUsed: number, body: UpdateUsedArtProps) {
    try {
        const { data } = await api.put(`/arts/used?idArtUsed=${idArtUsed}`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getStoreList(page: number, searchTxt: string) {
    try {
        const { data } = await api.get(`/users/search?page=${page}&limit=50&searchTxt=${searchTxt}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function resendArt(idArtUsed: number, idUser: number, type: string) {
    try {
        const body = {
            idArtUsed,
            idUser,
            type,
        };
        const { data } = await api.patch(`/arts/used/publish`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function removeScheduled(idArtUsed: number) {
    try {
        const body = {
            idArtUsed,
        };
        console.log('body: ', body)
        const { data } = await api.patch(`/arts/used/removeScheduled?idArtUsed`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function remove(idArtUsed: number) {
    try {
        const { data } = await api.delete(`/arts/used?idArtUsed=${idArtUsed}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function scheduledArt(idArtUsed: number, idUser: number, type: string, dateSend?: Date) {
    try {
        const body = {
            idArtUsed,
            idUser,
            dateSend: dateSend || null,
            type,
        };
        const { data } = await api.patch(`/arts/used/scheduled`, body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function allColorsList() {
    try {
        const { data } = await api.get(`/arts/colors`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function getUsedArtCodition(idUser: number) {
    try {
        const { data } = await api.get(`/arts/used/limitUsed?idUser=${idUser}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}
