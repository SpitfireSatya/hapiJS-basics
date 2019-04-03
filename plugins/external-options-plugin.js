
(function() {

  'use strict';

  const routeConfig = {
    handler: (request, reply) => {
      return '<h1>This is the response from the plugin with external config<h1>';
    }
  }

  const ExternalOptionsPlugin = {
    name: 'externalOptionsPlugin',
    version: '1.0.0',
    register: async (server, options) => {
        server.route({...routeConfig, ...options});
        return server;
    }
  };

  module.exports = ExternalOptionsPlugin;

}());
