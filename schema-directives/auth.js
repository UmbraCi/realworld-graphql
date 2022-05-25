const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');
const { AuthenticationError } = require('apollo-server-express')

const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

// This function takes in a schema and adds upper-casing logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `upper`)
function AuthDirective(schema, directiveName) {
    return mapSchema(schema, {
  
      // Executes once for each object field in the schema
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
  
        // Check whether this field has the specified directive
        const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
  
        if (upperDirective) {
            
          // Get this field's original resolver
          const { resolve = defaultFieldResolver } = fieldConfig;
  
          // Replace the original resolver with a function that *first* calls
          // the original resolver, then converts its result to upper case
          fieldConfig.resolve = async function (source, args, context, info) {
            const { token, dataSources } = context;
            if(!token){
              console.log(token)
                throw new AuthenticationError('未授权')
            }
            try {
                const decodeToken = await verify(token,jwtSecret)
                // console.log(decodeToken)
                const user = await dataSources.users.findById(decodeToken.id)
                // console.log(user)
                //把当前登录的用户挂载到context上下文对象中，给后续的resolver使用
                context.user = user
            } catch (error) {
              console.log(error)
                throw new AuthenticationError('未授权')
            }
            const result = await resolve(source, args, context, info);
            return result;
          }
          return fieldConfig;
        }
      }
    });
  }

  
  module.exports = AuthDirective;