import { ref, provide, inject } from 'vue';
import axios from 'axios';

const authState = ref({
    isAuthenticated: false,
    userDetails: null,
});

const checkAuth = async (forceServerCheck = false) => {
    try {

        if(authState.value.isAuthenticated && !forceServerCheck){
            // random 1/5 chance to check auth at server side
            if(Math.floor(Math.random() * 5) === 1){
                return;
            }
        }

        console.log('Checking auth & refreshing user details');
        const response = await axios.get('/api/auth-check');
        authState.value.isAuthenticated = response.data.authenticated;

        // If user is authenticated, get user details
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
