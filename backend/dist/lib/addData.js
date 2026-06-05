"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'bookShop';
async function seed() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db(dbName);
        // پاک کردن کالکشن‌های قبلی
        await Promise.all([
            db.collection('categories').deleteMany({}),
            db.collection('authors').deleteMany({}),
            db.collection('books').deleteMany({}),
            db.collection('users').deleteMany({}),
            db.collection('comments').deleteMany({}),
        ]);
        console.log('🗑️  Cleared existing collections');
        // ─── فاز ۱: Categories ───────────────────────────────────────────────────
        const categoryDocs = [
            { name: 'Fiction' },
            { name: 'Self Improvement' },
            { name: 'Sci-Fi' },
            { name: 'Business' },
            { name: 'Magical Realism' },
            { name: 'Creativity' },
            { name: 'Literary Fiction' },
            { name: 'Contemporary' },
        ];
        const categoryResult = await db
            .collection('categories')
            .insertMany(categoryDocs);
        const categoryIds = categoryResult.insertedIds; // { 0: ObjectId, 1: ObjectId, ... }
        console.log(`📂 Inserted ${Object.keys(categoryIds).length} categories`);
        // ─── فاز ۱: Authors ──────────────────────────────────────────────────────
        const authorDocs = [
            {
                name: 'Matt Haig',
                bio: 'British author known for fiction exploring life, mental health, and possibility.',
            },
            {
                name: 'James Clear',
                bio: 'Author of Atomic Habits and expert on habit formation.',
            },
            {
                name: 'Andy Weir',
                bio: 'Science fiction writer best known for hard-science novels.',
            },
            {
                name: 'Cal Newport',
                bio: 'Computer science professor and productivity author.',
            },
            {
                name: 'Toshikazu Kawaguchi',
                bio: 'Japanese author of the Before the Coffee Gets Cold series.',
            },
            {
                name: 'Rick Rubin',
                bio: 'Music producer and author focused on creativity.',
            },
            { name: 'Hanya Yanagihara', bio: 'American novelist and editor.' },
            {
                name: 'Kazuo Ishiguro',
                bio: 'Nobel Prize-winning British novelist.',
            },
        ];
        const authorResult = await db.collection('authors').insertMany(authorDocs);
        const authorIds = authorResult.insertedIds;
        console.log(`✍️  Inserted ${Object.keys(authorIds).length} authors`);
        // ─── فاز ۲: Books (با ObjectId reference) ────────────────────────────────
        //
        // نگاشت: authorId اصلی (1-based) → index در authorIds (0-based)
        //         categoryId اصلی (1-based) → index در categoryIds (0-based)
        const bookDocs = [
            {
                title: 'The Midnight Library',
                authorId: authorIds[0],
                categoryId: categoryIds[0],
                description: 'A luminous novel about regret, possibility, and choosing your life.',
                price: 18.99,
                image: '/images/the-midnight-library.jpg',
            },
            {
                title: 'Atomic Habits',
                authorId: authorIds[1],
                categoryId: categoryIds[1],
                description: 'Practical systems for behavior change that actually stick.',
                price: 22.99,
                image: '/images/atomic-habits.jpg',
            },
            {
                title: 'Project Hail Mary',
                authorId: authorIds[2],
                categoryId: categoryIds[2],
                description: 'A hilarious and high-stakes mission to save humanity.',
                price: 24.99,
                image: '/images/project-hail-mary.jpg',
            },
            {
                title: 'Deep Work',
                authorId: authorIds[3],
                categoryId: categoryIds[3],
                description: 'Train your focus in a distracted world.',
                price: 19.99,
                image: '/images/deep-work.jpg',
            },
            {
                title: 'Before the Coffee Gets Cold',
                authorId: authorIds[4],
                categoryId: categoryIds[4],
                description: 'Tender, time-bending stories in a quiet Tokyo cafe.',
                price: 17.99,
                image: '/images/before-the-coffee-gets-cold.jpg',
            },
            {
                title: 'The Creative Act',
                authorId: authorIds[5],
                categoryId: categoryIds[5],
                description: 'A meditative guide to making things with more soul.',
                price: 26.99,
                image: '/images/the-creative-act.jpg',
            },
            {
                title: 'A Little Life',
                authorId: authorIds[6],
                categoryId: categoryIds[6],
                description: 'A sweeping, intimate portrait of friendship, pain, and endurance.',
                price: 23.99,
                image: '/images/a-little-life.jpg',
            },
            {
                title: 'Klara and the Sun',
                authorId: authorIds[7],
                categoryId: categoryIds[7],
                description: 'A quiet, haunting story about love, care, and what it means to be human.',
                price: 21.99,
                image: '/images/klara-and-the-sun.jpg',
            },
        ];
        const bookResult = await db.collection('books').insertMany(bookDocs);
        const bookIds = bookResult.insertedIds;
        console.log(`📚 Inserted ${Object.keys(bookIds).length} books`);
        // ─── فاز ۲: Users ────────────────────────────────────────────────────────
        const userDocs = [
            { name: 'Mohammad', email: 'mohammad@example.com', password: '123456' },
            { name: 'Sara', email: 'sara@example.com', password: '123456' },
        ];
        const userResult = await db.collection('users').insertMany(userDocs);
        const userIds = userResult.insertedIds;
        console.log(`👤 Inserted ${Object.keys(userIds).length} users`);
        // ─── فاز ۳: Comments (با ObjectId reference) ─────────────────────────────
        //
        // userId اصلی (1-based) → index در userIds (0-based)
        // bookId  اصلی (1-based) → index در bookIds  (0-based)
        const commentDocs = [
            {
                text: 'Amazing book, highly recommended.',
                userId: userIds[0], // Mohammad
                bookId: bookIds[1], // Atomic Habits
                rating: 5,
            },
            {
                text: "One of the best sci-fi novels I've read.",
                userId: userIds[1], // Sara
                bookId: bookIds[2], // Project Hail Mary
                rating: 5,
            },
            {
                text: 'Very emotional and beautifully written.',
                userId: userIds[0], // Mohammad
                bookId: bookIds[6], // A Little Life
                rating: 4,
            },
            {
                text: 'A great productivity book.',
                userId: userIds[1], // Sara
                bookId: bookIds[3], // Deep Work
                rating: 5,
            },
        ];
        const commentResult = await db
            .collection('comments')
            .insertMany(commentDocs);
        console.log(`💬 Inserted ${Object.keys(commentResult.insertedIds).length} comments`);
        // ─── خلاصه ───────────────────────────────────────────────────────────────
        console.log('\n🎉 Seed complete!');
        console.log('Sample IDs for reference:');
        console.log('  categories[0] (Fiction):', categoryIds[0].toString());
        console.log('  authors[0] (Matt Haig):', authorIds[0].toString());
        console.log('  books[0] (Midnight Library):', bookIds[0].toString());
        console.log('  users[0] (Mohammad):', userIds[0].toString());
    }
    catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
    finally {
        await client.close();
    }
}
exports.default = seed;
