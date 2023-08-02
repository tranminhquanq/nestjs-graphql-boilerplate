export const isDev = process.env.NODE_ENV === 'development';
export const protocols = new Map([['https', 'https://']]);

export const tokenLifeTime = {
  access: 60 * 60, // 1 hour
  refresh: 60 * 60 * 24 * 30 * 3, // 3 months
};
