import { useRouter } from 'vue-router';
import {useAuthService} from "@/service/auth.service";
export function useAuthGuard() {
    const authService = useAuthService();
    const router = useRouter();

    const canActivate = (): boolean => {
        if (authService.isLoggedIn()) {
            return true;
        }
        router.push('/');
        return false;
    };

    return { canActivate };
}
