import { ref, provide, inject } from 'vue';
import axios from 'axios';

const authState = ref({
    isAuthenticated: false,
    userDetails: null,
});

const checkAuth = async () => {
    try {

        if(authState.value.isAuthenticated){
            // random 1/3 chance to check auth at server side
            if(Math.floor(Math.random() * 3) === 1){
                return;
            }
        }

        console.log('Checking auth');
        const response = await axios.get('/api/auth-check');
        authState.value.isAuthenticated = response.data.authenticated;
        if (authState.value.isAuthenticated) {
            const userResponse = await axios.get('api/user');
            authState.value.userDetails = userResponse.data;
        }
    } catch (error) {
        console.error('Failed to check authentication', error);
    }
};

const logout = async () => {
    try {
        await axios.post('/logout');
        authState.value.isAuthenticated = false;
        authState.value.userDetails = null;
    } catch (error) {
        console.error('Logout failed', error);
    }
};

export const provideAuth = () => {
    provide('auth', {
        state: authState,
        checkAuth,
        logout,
    });
};

export const useAuth = () => {
    return inject('auth');
};
