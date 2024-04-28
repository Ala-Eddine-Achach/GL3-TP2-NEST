import { GraphQLError } from "graphql";
import { PrismaClient } from '@prisma/client';
import { connect } from "http2";
const prisma = new PrismaClient();
export const Mutation = {
    createCV: async(_,{input},{pubsub} ) => {

        const find_user = await prisma.user.findUnique({
            where: {
                id: input.userId
            }
        });
        if (!find_user) {
            throw new GraphQLError("User not found");
        }
        const newCV = await prisma.cV.create({
            data: {
                name: input.name,
                age: input.age,
                job: input.job,
                skills: {
                    connect: input.skills
                },
                user: {
                    connect: {
                        id: input.userId
                    }
                }
            }
        });
        pubsub.publish("CVUpdates", { CVCreated: newCV });
        console.log(newCV);
        return newCV;
       
    },
    updateCV: async (_, { id, input }, { prisma, pubsub }) => {
        const findCV = await prisma.cV.findUnique({
            where: { id }
        });
        if (!findCV) {
            throw new GraphQLError("CV not found");
        }
        const finduser = await prisma.user.findUnique({
            where: {
                id: findCV.userId
            }
        });
        const newuser = await prisma.user.findUnique({
            where: {
                id: input.userId
        }});

           
        if (!finduser) {
            throw new GraphQLError("User not found");
        }
        if (!newuser) {
            throw new GraphQLError("new user not found");
        }
    
        const updatedCV = await prisma.cV.update({
            where: { id },
            data: {
                name: input.name || findCV.name,
                age: input.age || findCV.age,
                job: input.job || findCV.job,
                skills: {
                    connect: input.skills||findCV.skills
                },
                user: {
                    connect: { id: input.userId||findCV.userId }
                }
            }
        });
    
        pubsub.publish("CVUpdates", { CVUpdated: updatedCV });
        return updatedCV;
    },
    
    
    deleteCV:async (_,{id},{pubsub}) => { 
        const findCV = await prisma.cV.findUnique({
            where: {
                id
            }
        });
        if (!findCV) {
            throw new GraphQLError("CV not found");
        }
        const deletedCV = await prisma.cV.delete({
            where: {
                id
            }
        });
        pubsub.publish("CVUpdates", { CVDeleted: deletedCV });
        console.log("CV deleted :");
        console.log(deletedCV);
        return true;
    },
};