export const Subscription = {
    CVAdded: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("CV_ADDED")
    },
    CVUpdated: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("CV_UPDATED")
    },
    CVDeleted: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("CV_DELETED")
    }
};