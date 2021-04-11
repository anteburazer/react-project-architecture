import AdminConfig from 'apps/admin/Config';

const Config = {
  environment: process.env.REACT_APP_ENVIRONMENT,

  routes: {
    // Admin
    ...AdminConfig.routes,

    //Common
    nonExistingPage: '/auth/404',
    home: '/'
  }
};

export default Config;