import server from './app';

server.listen({ port: 4000 }, () => 
  console.log('🚀 Server ready at http://localhost:8000/graphql')
);
