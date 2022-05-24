const typeDefs = require('./type-defs')
const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('@graphql-tools/schema');
const upperDirectiveTransformer = require('./schema-directives/upper')
const AuthDirective = require('./schema-directives/auth')




// Create the base executable schema  
let schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

// Transform the schema by applying directive logic
schema = upperDirectiveTransformer(schema, 'uppercase');  
schema = AuthDirective(schema, 'auth');

module.exports = schema