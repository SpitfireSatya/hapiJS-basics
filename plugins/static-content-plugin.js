
(function() {

  'use strict';

  const routeConfig = {
    method: 'GET',
    path: '/static/{fileName}',
    handler: (request, reply) => {
      return reply.file(request.params.fileName);
    }
  };

  const StaticContentPlugin = {
    name: 'staticContentPlugin',
    version: '1.0.0',
    register: async (server, options) => {
        server.route(routeConfig);
        return server;
    }
  };

  module.exports = StaticContentPlugin;

}());
