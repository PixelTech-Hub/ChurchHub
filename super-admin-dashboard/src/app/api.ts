export const API_BASE_URL = 'http://localhost:8000';
// export const API_BASE_URL = 'https://churchhub-api.gulubcc.org';
export const ITEMS_PER_PAGE = 10


export const CHURCH_API_URL = `${API_BASE_URL}/churches`;


// SYSTEM ADMIN
export const ADMIN_API_URL = `${API_BASE_URL}/system_admin`;
export const ADMIN_SIGNUP_API_URL = `${API_BASE_URL}/admin/auth/signup`;
export const ADMIN_LOGIN_API_URL = `${API_BASE_URL}/admin/auth/login`;
export const ADMIN_LOGGED_API_URL = `${API_BASE_URL}/admin/auth/me`;
export const ADMIN_UPDATE_PASSWORD_API_URL = `${API_BASE_URL}/admin/auth/update-password`;


//CHURCH ADMIN
export const CHURCH_ADMIN_API_URL = `${API_BASE_URL}/users`;
export const CHURCH_ADMIN_SIGNUP_API_URL = `${API_BASE_URL}/users/auth/signup`;

//CHURCH STAFF
export const USER_AUTH_LOGIN_API = `${API_BASE_URL}/users/auth/login`;
export const USER_AUTH_SIGNUP_API = `${API_BASE_URL}/users/auth/signup`;
export const USERS_DETAIL_API = `${API_BASE_URL}/users`;
