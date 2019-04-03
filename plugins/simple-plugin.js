
(function() {

  'use strict';

  const routeConfig = {
    method: 'GET',
    path: '/simple',
    handler: (request, reply) => {
      return '<h1>This is the response from a simple plugin<h1>';
    }
  };

  const simplePlugin = {
    name: 'simplePlugin',
    version: '1.0.0',
    register: async (server, options) => {
        server.route(routeConfig);
        return server;
    }
  };

  module.exports = simplePlugin;

}());
