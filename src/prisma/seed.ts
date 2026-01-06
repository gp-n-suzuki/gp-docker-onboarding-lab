import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
});



export async function main() {
    console.log('Start seeding...');

    const todos = [
        { title: 'Buy milk', completed: false },
        { title: 'Learn Prisma 7', completed: true },
        { title: 'Build a Next.js app', completed: false },
    ];

    for (const todo of todos) {
        const result = await prisma.todo.upsert({
            where: { id: 0 },
            update: {},
            create: todo,
        });
        console.log(`Created todo with id: ${result.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {

    });