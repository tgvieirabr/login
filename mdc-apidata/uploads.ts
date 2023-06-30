import { api } from './api';

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
