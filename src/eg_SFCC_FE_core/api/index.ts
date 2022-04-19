import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const API_URL = 'http://localhost:3000/';
const shortCode = '6qm35880';
const organizationId = 'f_ecom_bfdz_003';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config: AxiosRequestConfig) => config,
  // eslint-disable-next-line arrow-parens
  async error => {
    const originalRequest = error.config;
    if (
      // eslint-disable-next-line operator-linebreak
      error.response.status === 401 &&
      // eslint-disable-next-line operator-linebreak
      error.config &&
      // eslint-disable-next-line no-underscore-dangle
      !error.config._isRetry
    ) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get<any>(
          `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${organizationId}/oauth2/token`,
          {
            withCredentials: true,
          },
        );
        Cookies.set('token', data.accessToken);
        Cookies.set('refreshToken', data.refreshToken);
        return await $api.request(originalRequest);
      } catch (e: any) {
        console.log(e.data?.message);
        console.log('is not authorized!');
      }
    }
    throw error;
  },
);

export default $api;
