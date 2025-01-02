import { ref } from 'vue';
import axiosInstace from 'axios';
import type { AxiosResponse } from 'axios';

interface LoginRequestDTO {
    email: string;
    password: string;
}

interface LoginResponseDTO {
    userId: number;
    username: string;
    email: string;
}

interface OtpResponse {
    id: number;
    username: string;
    jwtToken: string;
}

export function useAuthService() {
    const apiUrl = 'http://localhost:8080/auth';
    const authToken = ref<string | null>(localStorage.getItem('authToken'));
    const username = ref<string | null>(localStorage.getItem('username'));

    // Méthode de connexion
    const login = async (credentials: LoginRequestDTO): Promise<LoginResponseDTO> => {
        try {
            const response: AxiosResponse<LoginResponseDTO> = await axiosInstace.post(`${apiUrl}/login`, credentials);

            // Stocke temporairement les infos utilisateur dans localStorage
            localStorage.setItem('tempUserId', response.data.userId.toString());
            localStorage.setItem('tempUsername', response.data.username);
            localStorage.setItem('tempEmail', response.data.email);

            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // Méthode d'inscription
    const register = async (registerData: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axiosInstace.post(`${apiUrl}/register`, registerData);
            console.log('User registered successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const verifyOtp = async (email: string, otp: string): Promise<OtpResponse> => {
        try {
            const response: AxiosResponse<OtpResponse> = await axiosInstace.post(`${apiUrl}/verify-otp`, { email, otp });

            // Remplace les infos temporaires par le token définitif
            localStorage.setItem('authToken', response.data.jwtToken);
            localStorage.setItem('username', response.data.username);
            localStorage.removeItem('tempUserId');
            localStorage.removeItem('tempUsername');
            localStorage.removeItem('tempEmail');

            authToken.value = response.data.jwtToken;
            username.value = response.data.username;

            return response.data;
        } catch (error) {
            console.error('OTP validation error:', error);
            throw error;
        }
    };

    const sendOtp = async (email: string): Promise<void> => {
        try {
            await axiosInstace.post(`${apiUrl}/send-otp`, { email });
        } catch (error) {
            console.error('Send OTP error:', error);
            throw error;
        }
    };

    const getToken = (): string | null => {
        return authToken.value;
    };

    const getUsername = (): string | null => {
        return username.value;
    };

    const isLoggedIn = (): boolean => {
        return !!getToken();
    };

    const logout = (): void => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        authToken.value = null;
        username.value = null;
    };

    return {
        login,
        register,
        verifyOtp,
        sendOtp,
        getToken,
        getUsername,
        isLoggedIn,
        logout
    };
}
