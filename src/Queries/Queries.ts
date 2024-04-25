import { log } from "console";
import { GraphQLError } from "graphql";
import { Extension } from "typescript";

export const  CV= {
    user: ({user}, _, {db}) => {
        return {id: user.id, name: user.name, email: user.email, role: user.role};    
    },
    skills: ({skills}, __, {db}) => {
           return skills;
    },
}




export const Query = {
    CVsFetch:(_,__,{db})=>{
        console.log("CVsFetch");
        console.log(db.CVs);
        return db.cvs;
    },
    CVById:(_,{id},{db})=>{
       const findCV = db.cvs.find((cv)=>cv.id === id);
       if(!findCV){
           throw new GraphQLError("CV not found");
       }
         return findCV;
    } ,
    SkillsFetch:(_,__,{db})=>{
        return db.skills;
    },
}

export const  Skill= {
    
    cvs: ({ id } , _, { db }) => {

        const cvfound = db.cvs.filter((cv)=>{
            return include(cv.skills,"id",id);
        } )
        return cvfound;
    },
}

export function include (array ,attribut = "",value){
    return array.some((element) => element[attribut] == value );
}

