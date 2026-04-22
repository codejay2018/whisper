import { useAuth } from '@clerk/expo';
import axios from 'axios';
import { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';


const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useApi = () => {

    const {getToken} = useAuth();

    useEffect(() => {
        const requestinterceptor = api.interceptors.request.use(async (config) => {
            const token = await getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        const responseInterceptor = api.interceptors.response.use(response => response, error => {
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

        // Cleanup function to eject the interceptor when the component unmounts
        return () => {
            api.interceptors.request.eject(requestinterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };  

    }, [getToken]);

    return api;

};
