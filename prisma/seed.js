const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create user

    const user2 = await prisma.user.create({
        data: {
            email: 'user123@example.com',
            password: 'password2',
            firstName: 'User',
            lastName: 'Two',
            gender: 'Female',
            cpVerified: 1,
            dlVerified: 1,
        },
    });

    const user3 = await prisma.user.create({
        data: {
            email: 'randomemail@example.com',
            password: 'password22',
            firstName: 'User',
            lastName: 'Three',
            gender: 'Female',
            cpVerified: 1,
            dlVerified: 1,
        },
    });

    // Create a conversation
    const conversation = await prisma.conversation.create({
        data: {
            participants: {
                connect: [{ id: 1 }, { id: user2.id }],
            },
            messages: {
                create: [
                    {
                        sender: {
                            connect: { id: 1 },
                        },
                        recipient: {
                            connect: { id: user2.id },
                        },
                        content: "Hi there!",
                        request: false,
                        time: new Date(),
                    },
                    {
                        sender: {
                            connect: { id: user2.id },
                        },
                        recipient: {
                            connect: { id: 1 },
                        },
                        content: "Hello! How are you?",
                        request: false,
                        time: new Date(),
                    },
                ],
            },
        },
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
