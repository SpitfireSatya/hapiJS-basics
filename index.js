(function() {

  'use strict';

  const Hapi = require('hapi');

  const serverConfig = {
    host: 'localhost',
    port: 3000
  }

  const server = new Hapi.Server(serverConfig);

  function registerErrorHandler() {
    process.on('unhandledRejection', (err) => {
      console.log(err);
      process.exit(1);
    });
  }

  function registerRoutesToServer() {
    const routeConfig = {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        return `<h1>Hey! You've just hit the default route<h1>`;
      }
    };
    server.route(routeConfig)
  }

  function init() {
    registerErrorHandler();
    registerRoutesToServer();
    server.start();
    console.log(`Server running at: http://${serverConfig.host}:${serverConfig.port}`);
  }

  init();

}())