import axios from 'axios';

export const getBaseUrl = (): string => {
  const isStaging = window.location.hostname.includes('staging');
  const isBeta = window.location.hostname.includes('beta.adm.midiacarros');
  const isProd = window.location.hostname.includes('adm.midiacarros');
  if (isBeta) {
    return 'https://beta.api.midiacarros.com.br';
  }
  if (isProd) {
    return 'https://api.midiacarros.com.br';
  }
  if (isStaging) {
    return 'https://staging.midiacarrosapi.dotcoding.com.br';
  }

  return 'https://development.midiacarrosapi.dotcoding.com.br';
};

export const api = axios.create({
    baseURL: getBaseUrl(),
});
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
    address: string;import { api } from './api';

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
}import { api } from './api';

interface CreateEventProps {
    name: string,
}

export async function getEventList() {
    try {
        const { data } = await api.get('/events?page=1&limit=50');
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function createEvent(body: CreateEventProps) {
    try {
        const { data } = await api.post('/events', body);
        return data;import { api } from '../services/api';

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
import { api } from './api';

interface UpdatePageProps {
    namePage: string,
    keyPage: string,
    accessToken: string,
    idUser: number,
}import { api } from './api';

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

    try {import { api } from './api';
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
    }import { api } from './api';

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
interface ImageProps {
    name: string;
    type: string;
    base64: string;
}

export async function getImageLink(body: ImageProps) {
    try {
        const { data } = await api.post('/uploads', body);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}
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

export async function getPlansDetails(idUser: number) {
    try {
        const { data } = await api.get(`/plans/details?idUser=${idUser}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}
    } catch ({ response: { data } }) {
        return data;
    }
}

export async function deleteEvent(idEvent: number) {
    try {
        const { data } = await api.delete(`/events?idEvent=${idEvent}`);
        return data;
    } catch ({ response: { data } }) {
        return data;
    }
}


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
