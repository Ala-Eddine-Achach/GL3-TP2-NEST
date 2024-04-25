import { resolve } from "path";

export const Subscription = {
    
    CVUpdated: {
        subscribe: (_, __, { pubsub })=>{
             console.log('subscribed');
            return pubsub.subscribe('CVUpdates');},
        resolve: (payload) => {
            console.log(payload);
            return payload.CVUpdated;
        }
    },
    
};