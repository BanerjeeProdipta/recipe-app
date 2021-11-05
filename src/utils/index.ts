// import { store } from '../stores';

// export const isAuthenticate = () => (store.getState().userReducer.user ? true : false);
export const isAuthenticate = () => true;

// all regex
export const emailRegex = /^([a-z\d._-]+)@([a-z\d_-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i;
export const lowercaseRegex = /(?=.*[a-z])/;
export const uppercaseRegex = /(?=.*[A-Z])/;
export const numericRegex = /(?=.*[0-9])/;
export const specialCharRegex = /(?=.*[\^$*.[\]{}()?“!@#%&/,><’:;|_~`/-])/;
export const durationRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/;

export const setAccessToken = (token: string) => {
  window.localStorage.setItem('access-token', token);
};

export function getToken() {
  let accessToken: string | null = null;
  if (typeof window !== undefined && window.localStorage.getItem('access-token')) {
    accessToken = window.localStorage.getItem('access-token');
    return accessToken;
  } else {
    removeAccessToken();
  }
  return accessToken;
}

export const removeAccessToken = () => {
  window.localStorage.removeItem('access-token');
};
