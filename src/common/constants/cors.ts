import { isDev } from './generals';

const devAllowList = ['https://localhost:3000'];
const prodAllowList = [];
export const ALLOW_LIST = new Set(isDev ? devAllowList : prodAllowList);
