import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Backend',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44366/',
    redirectUri: baseUrl,
    clientId: 'Backend_App',
    responseType: 'code',
    scope: 'offline_access Backend',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44366',
      rootNamespace: 'Backend',
    },
  },
} as Environment;
