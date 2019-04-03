
(function() {

  'use strict';
  const Wreck = require('@hapi/wreck');

  const routeConfig = {
    method: 'GET',
    path: '/star-wars-quotes',
    handler: async (request, reply) => {
      
      try {
        const res = await Wreck.request('get', 'http://localhost:3000/static/star-wars.json');
        const body = await Wreck.read(res, {
          json: true
        });
        return reply.view('star-wars-quotes', body);
      } catch(err) {
        console.log(err);
        return reply.response('Something went wrong.')
      }
    
    }
  };

  const StarWarsPlugin = {
    name: 'StarWarsPlugin',
    version: '1.0.0',
    register: async (server, options) => {
        server.route(routeConfig);
        return server;
    }
  };

  module.exports = StarWarsPlugin;

}());
