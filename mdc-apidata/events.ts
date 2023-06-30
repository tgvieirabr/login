import { api } from './api';

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
        return data;
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
