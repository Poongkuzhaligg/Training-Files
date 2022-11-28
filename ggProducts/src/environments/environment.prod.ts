import packageInfo from '../../package.json';


export const environment = {
  production: true,
  apiUrl: 'http://localhost:8100/api/',
  version: `${packageInfo.version}`
};
