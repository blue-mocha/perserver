
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
//  typeDefs, resolvers를 합칠경우 => schema.

//불러오기 
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations,resolvers}.ts`);

//합치기 
export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);


//schema 
export const MySchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

