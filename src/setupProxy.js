/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'https://biergit-int.scapp.io',
      changeOrigin: true,
    }),
  );
  app.use(
    '/local',
    proxy({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/local': '', // rewrite path
      },
      logLevel: 'debug',
    }),
  );
};
