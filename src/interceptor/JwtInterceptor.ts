import axios from 'axios';
import router from '@/router';

const axiosInstance = axios.create();

const excludedUrls = ['/auth/login', '/auth/register'];

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');

    // Vérifiez si l'URL de la requête est exclue
    if (excludedUrls.some((url) => config.url?.includes(url))) {
        return config;
    }


    if (token) {
        if (!config.headers) {
            config.headers = new axios.AxiosHeaders();
        }

        config.headers.set('Authorization', `Bearer ${token}`);
    }

    console.log('Headers after modification:', config.headers);

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Ajout de l'intercepteur pour les réponses
axiosInstance.interceptors.response.use(
    (response) => {
        // Retourner directement la réponse si tout va bien
        return response;
    },
    (error) => {
        if (error.response?.status === 403) {
            // Supprimer le token en cas d'erreur 403 et rediriger l'utilisateur
            localStorage.removeItem('authToken');
            router.push('/');
        }

        // Propager l'erreur pour d'autres gestionnaires
        return Promise.reject(error);
    }
);

export default axiosInstance;
