/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/naming-convention */
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import $api from './index';

const shortCode = '6qm35880';
const organizationId = 'f_ecom_bfdz_003';

const public_client_id = 'b05eae07-8883-4892-baf8-da9c564049f1';

const redirect_uri =
  'https://bfdz-003.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-EmpowerGlobal-Site/en_US/CommerceAPI-AcceptRedirection';

export const API_URL = 'http://localhost:3000/';

export const setPublicGuestToken = async () => {
  const { data } = await $api.post(
    `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${organizationId}/oauth2/token`,
  );
  Cookies.set('token', data.access_token);
  Cookies.set('refreshToken', data.refresh_token);

  return jwt_decode(data.access_token);
};

export const getPublicGuestToken = async () => {
  const { data } = await $api.get<{
    action: string;
    queryString: string;
    locale: string;
  }>(
    `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${organizationId}/oauth2/authorize?client_id=${public_client_id}&redirect_uri=${redirect_uri}&hint=guest&response_type=code&code_challenge={{PUBLIC_GUEST_CODE_CHALLENGE}}&channel_id=EmpowerGlobal`,
  );
  if (data.action === 'CommerceAPI-AcceptRedirection') {
    setPublicGuestToken();
  }
};
