export const API_BASE_URL = 'http://localhost:8000';
export const ITEMS_PER_PAGE = 10



//USER API
export const USER_AUTH_LOGIN_API = `${API_BASE_URL}/users/auth/login`;
export const USER_AUTH_SIGNUP_API = `${API_BASE_URL}/users/auth/signup`;
export const USER_DETAIL_API = `${API_BASE_URL}/users/auth/me`;
export const USERS_DETAIL_API = `${API_BASE_URL}/users/church`;



//CHURCH API
export const CHURCH_API_URL = `${API_BASE_URL}/churches`;


//CHURCH BRANCH_API
export const ALL_CHURCH_BRANCH_API_URL = `${API_BASE_URL}/church_branches/church`;
export const CHURCH_BRANCH_API_URL = `${API_BASE_URL}/church_branches`;

//CHURCH SERVICES API
export const CHURCH_SERVICE_API_URL = `${API_BASE_URL}/church_services`;
export const ALL_CHURCH_SERVICE_API_URL = `${API_BASE_URL}/church_services/church`;

//CHURCH MINISTIES API
export const CHURCH_MINISTRIES_API_URL = `${API_BASE_URL}/church_ministries`;
export const ALL_CHURCH_MINISTRIES_API_URL = `${API_BASE_URL}/church_ministries/church`;

