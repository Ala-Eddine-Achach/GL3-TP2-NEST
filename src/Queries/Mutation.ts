import { GraphQLError } from "graphql";
export const Mutation = {
    createCV: (_,{input},{db,pubsub} ) => {
        const find_user = db.users.find((user)=>user.id === input.userId);
        if(!find_user){
            console.log(input.userId);
            throw new GraphQLError("User not found");
        }
        //random id
        var id= Math.floor(Math.random() * 1000);
        while(db.cvs.find((cv)=>cv.id === id)){
            id= Math.floor(Math.random() * 1000);
        }
        const newCV = {
            id: id,
            name: input.name,
            age: input.age,
            job: input.job,
            skills: input.skills,
            user: find_user,
        };

        db.cvs.push(newCV);
        
        pubsub.publish("CV_ADDED", { CVAdded: newCV });
        return newCV;
    },
    updateCV(_,{id,input},{db,pubsub}){

        const findCV = db.cvs.find((cv)=>cv.id === id);
        if(!findCV){
            throw new GraphQLError("CV not found");
        }
        const find_user = db.users.find((user)=>user.id === input.user_id);
        if(!find_user){
            throw new GraphQLError("User not found");
        }
        if(input.name)
        findCV.name = input.name;
        if(input.age)
        findCV.age = input.age;
        if(input.job)
        findCV.job = input.job;
        if(input.skills)
        findCV.skills = input.skills;
        findCV.user = find_user;
        pubsub.publish("CV_UPDATED", { CVUpdated: findCV });
        return findCV;
    },
    deleteCV: (_,{id},{db,pubsub}) => { 
        const findCV = db.cvs.find((cv)=>cv.id === id);
        if(!findCV){
            throw new GraphQLError("CV not found");
        }
        db.cvs = db.cvs.filter((cv)=>cv.id !== id);
        findCV.user.cvs = findCV.user.cvs.filter((cv)=>cv.id !== id);
        pubsub.publish("CV_DELETED", { CVDeleted: findCV });
        return findCV;  
    },
};