
(function() {

  'use strict';

  const Hapi = require('hapi');
  const Path = require('path');
  const Inert = require('inert');
  const Vision = require('vision');
  const Handlebars = require('handlebars');

  const SimplePlugin = require('./plugins/simple-plugin');
  const ExternalOptionsPlugin = require('./plugins/external-options-plugin');
  const DynamicRoutePlugin = require('./plugins/dynamic-route-plugin');
  const StaticContentPlugin = require('./plugins/static-content-plugin');
  const StarWarsPlugin = require('./plugins/star-wars-plugin');

  const serverConfig = {
    host: 'localhost',
    port: 3000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
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
        return reply.response(`<h1>Hey! You've just hit the default route<h1>`);
      }
    };
    server.route(routeConfig);
    server.route({
      method: '*',
      path: '/{any*}',
      handler: (request, reply) => {
        return reply.response('404 Error! Page Not Found!');
      }
    });
  }

  const registerDependencies = async () => {
    await server.register(Inert);
    await server.register(Vision);
  }

  const configureTemplateEngine = async () => {
    await server.views({
      engines: {
          html: {
              module: Handlebars,
              compileMode: 'sync' // engine specific
          }
      },
      relativeTo: __dirname,
      path: './templates',
      compileMode: 'async' // global setting
    });
  }

  const registerPlugins = async () => {
    await server.register([
      SimplePlugin,
      {
        plugin: ExternalOptionsPlugin,
        options: {
          method: 'GET',
          path: '/external'
        },
      },
      DynamicRoutePlugin,
      StaticContentPlugin,
      StarWarsPlugin
    ]);
  }

  const init = async () => {
    registerErrorHandler();
    registerRoutesToServer();
    await registerDependencies();
    await configureTemplateEngine();
    await registerPlugins();
    await server.start();
    console.log(`Server running at: http://${serverConfig.host}:${serverConfig.port}`);
  }

  init();

}());
