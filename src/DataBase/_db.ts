// Purpose: Define the structure of the database.
interface CV {
    id: number;
    name: string;
    age: string;
    job: string;
    skills: Skill[];
    user: User;
}


 interface Skill {
    id: number;
    designation: string;
 }


interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}


//Roles
enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}



//database
 const skills: Skill[] = [
    { id: 1, designation: 'HTML' },
    { id: 2, designation: 'CSS' },
    { id: 3, designation: 'JavaScript' },
    { id: 4, designation: 'Node.js' },
    { id: 5, designation: 'React.js' },
    { id: 6, designation: 'Angular' },
    { id: 7, designation: 'Vue.js' },
    { id: 8, designation: 'Python' },
    { id: 9, designation: 'Java' },
    { id: 10, designation: 'C#' },
    { id: 11, designation: 'C++' },
    { id: 12, designation: 'PHP' },
    { id: 13, designation: 'SQL' },
    { id: 14, designation: 'MongoDB' },
    { id: 15, designation: 'PostgreSQL' },
    { id: 16, designation: 'Docker' },
    { id: 17, designation: 'Kubernetes' },
    { id: 18, designation: 'AWS' },
    { id: 19, designation: 'Azure' },
 ];

const users: User[] = [
    { id: 1, name: 'Ala Eddine Achach', email: 'achachaladin@gamilLcom', role: Role.ADMIN},
    { id: 2, name: 'John Doe', email: 'john@gamilLcom', role: Role.USER},
    { id: 3, name: 'Jane Doe', email: 'jane@gamilLcom', role: Role.USER},
    { id: 4, name: 'Foo Bar', email: 'foo@gamilLcom', role: Role.USER},
    { id: 5, name: 'Baz Qux', email: 'baz@gamilLcom', role: Role.USER},
];
 const cvs: CV[] = [
    {
        id: 1,
        name: 'Ala Eddine Achach',
        age: '25',
        job: 'Manger of a company',
        skills: [skills[2], skills[3], skills[4]],
        user: users[0],
    },
    {
        id: 2,
        name: 'John Doe',
        age: '30',
        job: 'Web Developer',
        skills: [skills[0], skills[1], skills[2], skills[3], skills[4]],
        user: users[1],
    },
    {
        id: 3,
        name: 'Jane Doe',
        age: '28',
        job: 'Frontend Developer',
        skills: [skills[0], skills[1], skills[2], skills[4]],
        user: users[2],
    },
    {
        id: 4,
        name: 'Foo Bar',
        age: '35',
        job: 'Backend Developer',
        skills: [skills[3], skills[4], skills[5]],
        user: users[3],
    },
    {
        id: 5,
        name: 'Baz Qux',
        age: '40',
        job: 'Fullstack Developer',
        skills: [skills[0], skills[1], skills[2], skills[3], skills[4], skills[5]],
        user: users[4],
    },
];


export const db = {
    cvs,
    skills,
    users,
};