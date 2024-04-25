
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { Query } from "./src/Queries/Query";
import { Mutation } from "./src/Queries/Mutation";
import { createPubSub } from '@graphql-yoga/subscription';
import { db } from "./src/DataBase/_db";  
const fs = require("fs");
const path = require("path");
type PubSubChannels = {
    CVUpdates,
    CVAdded,
    CVDeleted
  }
const pubsub = createPubSub<PubSubChannels>();  
export const schema = createSchema({
typeDefs: fs.readFileSync(
path.join(__dirname, "src/schemas/schema.graphql"),"utf-8"
),

resolvers: {
    Query,
    Mutation,

},
});
function main() {
const yoga = createYoga({ schema ,
             context: { db }});
const server = createServer(yoga);
server.listen(4000, () => {
console.info("TP2 is here : http://localhost:4000/graphql");
});
}
main();