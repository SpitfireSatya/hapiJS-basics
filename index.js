
(function() {

  'use strict';

  const Hapi = require('hapi');
  const simplePlugin = require('./plugins/simple-plugin');

  const serverConfig = {
    host: 'localhost',
    port: 3000,
  }

  const server = new Hapi.Server(serverConfig);

  const registerErrorHandler = () => {
    process.on('unhandledRejection', (err) => {
      console.log(err);
      process.exit(1);
    });
  }

  const registerRoutesToServer = () => {
    const routeConfig = {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        return `<h1>Hey! You've just hit the default route<h1>`;
      }
    };
    server.route(routeConfig)
  }

  const registerPlugins = async () => {
    await server.register([simplePlugin]);
  }

  const init = async () => {
    registerErrorHandler();
    registerRoutesToServer();
    await registerPlugins();
    await server.start();
    console.log(`Server running at: http://${serverConfig.host}:${serverConfig.port}`);
  }

  init();

}());
