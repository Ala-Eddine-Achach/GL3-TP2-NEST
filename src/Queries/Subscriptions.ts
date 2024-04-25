import { resolve } from "path";

export const Subscription = {
    
    CVUpdated: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("CV_UPDATED"),
        resolve: (payload) => {
            return payload;
        }
    },
    
};