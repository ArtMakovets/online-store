export const API_URL = import.meta.env.VITE_API_URL;

export const API_MOCKING = import.meta.env.VITE_PUBLIC_API_MOCKING === 'true';

export const IS_DEVELOPMENT = import.meta.env.MODE === 'development';
export const IS_TEST = import.meta.env.MODE === 'test';
export const IS_PRODUCTION = import.meta.env.MODE === 'production';

export const IS_BROWSER = typeof window !== 'undefined';
export const IS_SERVER = typeof window === 'undefined';