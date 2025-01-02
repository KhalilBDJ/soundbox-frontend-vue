import axiosInstance from 'axios';
import type { AxiosResponse } from 'axios';
import axiosInstance from "@/interceptor/JwtInterceptor";

export interface Sound {
    id: number;
    name: string;
    duration: number;
    data: string; // Base64 string
}

export function useSoundService() {
    const apiUrl = 'http://localhost:8080/sounds';

    const getUserSounds = async (): Promise<Sound[]> => {
        try {
            const response: AxiosResponse<Sound[]> = await axiosInstance.get(`${apiUrl}/user/me`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user sounds:', error);
            throw error;
        }
    };

    const uploadSoundFromYouTube = async (youtubeUrl: string, name: string): Promise<{ message: string; name: string }> => {
        try {
            const response: AxiosResponse<{ message: string; name: string }> = await axiosInstance.post(`${apiUrl}/user/youtube`, null, {
                params: { url: youtubeUrl, name },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading sound from YouTube:', error);
            throw error;
        }
    };

    const getInstagramPreview = async (instagramUrl: string): Promise<{ audioBlob: Blob; name: string; duration: number }> => {
        try {
            const response: AxiosResponse<{ name: string; duration: number; audioData: string }> = await axiosInstance.post(
                `${apiUrl}/user/instagram/preview`,
                null,
                { params: { url: instagramUrl } }
            );
            return processAudioResponse(response.data);
        } catch (error) {
            console.error('Error fetching Instagram preview:', error);
            throw error;
        }
    };

    const getTikTokPreview = async (tiktokUrl: string): Promise<{ audioBlob: Blob; name: string; duration: number }> => {
        try {
            const response: AxiosResponse<{ name: string; duration: number; audioData: string }> = await axiosInstance.post(
                `${apiUrl}/user/tiktok/preview`,
                null,
                { params: { url: tiktokUrl } }
            );
            return processAudioResponse(response.data);
        } catch (error) {
            console.error('Error fetching TikTok preview:', error);
            throw error;
        }
    };

    const uploadSoundFileToUser = async (formData: FormData): Promise<string> => {
        try {
            const response: AxiosResponse<string> = await axiosInstance.post(`${apiUrl}/user/`, formData);
            return response.data;
        } catch (error) {
            console.error('Error uploading sound file:', error);
            throw error;
        }
    };

    const updateSoundName = async (soundId: number, newName: string): Promise<void> => {
        try {
            await axiosInstance.put(`${apiUrl}/user/${soundId}`, { name: newName });
        } catch (error) {
            console.error('Error updating sound name:', error);
            throw error;
        }
    };

    const deleteSound = async (soundId: number): Promise<void> => {
        try {
            await axiosInstance.delete(`${apiUrl}/${soundId}`);
        } catch (error) {
            console.error('Error deleting sound:', error);
            throw error;
        }
    };

    const getYouTubePreview = async (youtubeUrl: string): Promise<{ audioBlob: Blob; name: string; duration: number }> => {
        try {
            const response: AxiosResponse<{ name: string; duration: number; audioData: string }> = await axiosInstance.post(
                `${apiUrl}/user/youtube/preview`,
                null,
                { params: { url: youtubeUrl } }
            );
            return processAudioResponse(response.data);
        } catch (error) {
            console.error('Error fetching YouTube preview:', error);
            throw error;
        }
    };

    const trimAndUploadSound = async (
        audioBase64: string,
        start: number,
        end: number
    ): Promise<{ trimmed_audio_base64: string }> => {
        try {
            const response: AxiosResponse<{ trimmed_audio_base64: string }> = await axiosInstance.post(`${apiUrl}/trim`, {
                audioBase64,
                start,
                end,
            });
            return response.data;
        } catch (error) {
            console.error('Error trimming and uploading sound:', error);
            throw error;
        }
    };

    const uploadSoundBytes = async (
        soundData: { data: string; name: string; duration: number }
    ): Promise<{ message: string; name: string }> => {
        try {
            const response: AxiosResponse<{ message: string; name: string }> = await axiosInstance.post(`${apiUrl}/user/bytes`, soundData, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading sound bytes:', error);
            throw error;
        }
    };

    const processAudioResponse = (data: { name: string; duration: number; audioData: string }): { audioBlob: Blob; name: string; duration: number } => {
        const binaryString = window.atob(data.audioData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const audioBlob = new Blob([bytes], { type: 'audio/mp3' });

        return {
            audioBlob,
            name: data.name,
            duration: data.duration,
        };
    };

    return {
        getUserSounds,
        uploadSoundFromYouTube,
        getInstagramPreview,
        getTikTokPreview,
        uploadSoundFileToUser,
        updateSoundName,
        deleteSound,
        getYouTubePreview,
        trimAndUploadSound,
        uploadSoundBytes,
    };
}
