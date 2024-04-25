
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { CV, Query, Skill } from "./src/Queries/Queries";
import { Mutation } from "./src/Queries/Mutations";
import { createPubSub } from '@graphql-yoga/subscription';
import { db } from "./src/DataBase/_db";  
import { Subscription } from "./src/Queries/Subscriptions";
import fs from "fs";
import path from "path";
type PubSubChannels = {
    CVUpdates
  }
const pubsub = createPubSub<PubSubChannels>();  
export const schema = createSchema({
typeDefs: fs.readFileSync(
path.join(__dirname, "src/schemas/schema.graphql"),"utf-8"
),

resolvers: {
    Skill,
    Query,
    Mutation,
    Subscription,
    CV,

},
});
function main() {
const yoga = createYoga({
    schema ,
context: {
    db,
    pubsub
}as any,

});
const server = createServer(yoga);
server.listen(4000, () => {
console.info("TP2 is here : http://localhost:4000/graphql");
});
}
main();