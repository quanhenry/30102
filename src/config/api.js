export const API_CONFIG = {
    BASE_URL: 'http://your-api-domain.com/api',
    ENDPOINTS: {
      AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
      },
      USERS: {
        PROFILE: '/users/profile',
        UPDATE: (id) => `/users/${id}`,
      }
    }
  };