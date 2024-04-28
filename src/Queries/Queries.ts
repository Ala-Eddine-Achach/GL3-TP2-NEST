import { log } from "console";
import { GraphQLError } from "graphql";
import { Extension } from "typescript";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const  CV= {
    id: ({id}) => id||0,
    name: ({name}) => name||"",
    age: ({age}) => age||"",
    job: ({job}) => job||"",
    
    
    user: async({userId}, _, {}) => {
        console.log("userId is kll");
        console.log(userId);
        
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        });  
    },
    skills:async ({id}, __, {db}) => {
        return await prisma.skill.findMany({
            where: {
                cvs: {
                    some: {
                        id
                    }
                }
            }
        });
           
    },
}




export const Query = {
    CVsFetch:async(_,__,{})=>{
        return await prisma.cV.findMany({
            include:{
                user : true,
                skills:true
            }
        });
    },
    CVById:async(_,{id},{})=>{
        const cv = await prisma.cV.findUnique({
            where:{
                id
            },
            include:{
                user:true,
                skills:true
            }
        });
      if(!cv) throw new GraphQLError("CV not found");
        return cv;  
    },
    SkillsFetch:async(_,__,{})=>{
        return await prisma.skill.findMany({
            include:{
                cvs:true

            }
        });
    },
   
}

export const  Skill= {
    
    cvs: async ({id}) => {
        return await prisma.cV.findMany({
            where: {
                skills: {
                    some: {
                        id
                    }
                }
            }
        ,
    include:{
        user : true,
        
    }});
    }
}
    
export const User = {
    id: ({id}) => id||0,
    name: ({name}) => name||"",
    email: ({email}) => email||"",
    role: ({role}) => role||"",
    cvs:async ({id}, __, {db}) => {
        return await prisma.cV.findMany({
            where: {
                userId: id
            }
        });
    },
}


