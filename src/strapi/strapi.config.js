/* eslint-disable linebreak-style */
import Strapi from 'strapi-sdk-javascript/build/main';

// eslint-disable-next-line no-undef
const apiUrl = process.env.API_URL || 'https://larexirwebstore.com';
export const strapi = new Strapi(apiUrl);
export const STRAPI_MAIL_POST_URL='https://larexirwebstore.com/email'
export const LAREXIR_MAIL_FOR_CONTACT='informari@larexir.ro'
export const STRAPI_PASSWORD_RESET_URL='https://larexirwebstore.com/admin/plugins/users-permissions/auth/reset-password'

