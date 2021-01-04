import server from './app';

server.listen({ port: process.env.PORT }, () => 
  console.log('🚀 Server ready at http://' + process.env.IP + ':' + process.env.PORT + '/graphql')
);
