
(function() {

  'use strict';

  const routeConfig = {
    method: 'GET',
    path: '/dynamic/{myParam}',
    handler: (request, reply) => {
      return `<h1>Hey, you passed <i>"${request.params.myParam}"</i> as the dynamic part.<h1>`;
    }
  };

  const DynamicRoutePlugin = {
    name: 'dynamicRoutePlugin',
    version: '1.0.0',
    register: async (server, options) => {
        server.route(routeConfig);
        return server;
    }
  };

  module.exports = DynamicRoutePlugin;

}());
