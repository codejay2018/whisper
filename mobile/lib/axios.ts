import { useAuth } from '@clerk/expo';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import * as Sentry from '@sentry/react-native';


const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {    'Content-Type': 'application/json',   },
});

// Response interceptor registered once to log all API errors to Sentry
api.interceptors.response.use(response => response, error => {
    if(error.response){
        Sentry.logger.error(
            Sentry.logger.fmt`API Request Failed: ${error.config?.method?.toUpperCase()} ${error.config?.url} - Status: ${error.response.status}`,
            {
                status: error.response.status,
                endpoint: error.config?.url,
                method: error.config?.method,
            }
        );
    }else if (error.request) {
        Sentry.logger.error(
            Sentry.logger.fmt`API Request Failed: No response received for ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
            {
                endpoint: error.config?.url,
                method: error.config?.method,
            }
        );
    } else {
        Sentry.logger.error(
            Sentry.logger.fmt`API Request Failed: ${error.message}`,
            {
                message: error.message,
            }
        );
    }

    return Promise.reject(error);
});

export const useApi = () => {

    const {getToken} = useAuth();

    const apiWithAuth = useCallback(
        async <T>(config:Parameters<typeof api.request>[0]) => {
            const token = await getToken();
            const authConfig = {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                },
            };
            return api.request<T>(authConfig);
        },
        [getToken]
    );

    return { api, apiWithAuth };
};
