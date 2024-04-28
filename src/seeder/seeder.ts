import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function populateDatabase() {
  try {
    const user1 = await prisma.user.create({
        data: {
            name: 'Ala Eddine Achach',
            email: 'achachaladin@gamilLcom',
            role: 'ADMIN',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            name: 'Jane Doe',
            email: 'jane@gamilLcom',
            role: 'USER',
        },
    });
    const user3 = await prisma.user.create({
        data: {
            name: 'alice',
            email: 'alice@gamilLcom',
            role: 'USER',
        },
    });
    const skill1 = await prisma.skill.create({
        data: {
            designation: 'JavaScript',
        },
    });
    const skill2 = await prisma.skill.create({
        data: {
            designation: 'React',
        },
    });
    const skill3 = await prisma.skill.create({
        data: {
            designation: 'Node.js',
        },
    });
    const skill4 = await prisma.skill.create({
        data: {
            designation: 'GraphQL',
        },
    });
    const cv1 = await prisma.cV.create({
        data: {
            name: 'Ala Eddine Achach CV',
            age: "25",
            job: 'Software Engineer',
            userId: user1.id,
            skills: {
                connect: [
                    { id: skill1.id },
                    { id: skill2.id },
                    { id: skill3.id },
                    { id: skill4.id },
                ],
            },
        },
    });
    const cv2 = await prisma.cV.create({
        data: {
            name: 'Jane Doe CV',
            age: "30",
            job: 'Frontend Developer',
            userId: user2.id,
            skills: {
                connect: [
                    { id: skill1.id },
                    { id: skill2.id },
                ],
            },
        },
    });
    const cv3 = await prisma.cV.create({
        data: {
            name: 'Alice CV',
            age: "28",
            job: 'Backend Developer',
            userId: user3.id,
            skills: {
                connect: [
                    { id: skill3.id },
                    { id: skill4.id },
                ],
            },
        },
    });
    
}
catch (error) {
    console.error(error);
}
finally {
    await prisma.$disconnect();
}
}


populateDatabase();
