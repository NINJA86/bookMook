const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const books = [
  {
    slug: "the-midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 18,
    format: "Hardcover",
    category: "Fiction",
    rating: 4.8,
    pages: 304,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    blurb: "A luminous novel about regret, possibility, and choosing your life.",
    description: "Dive into a dreamlike library between life and death, where each book shows a different version of what might have been.",
    featured: true,
    newArrival: true,
    tags: ["Bestseller", "Atmospheric", "Staff Pick"]
  },
  {
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    price: 22,
    format: "Paperback",
    category: "Self Improvement",
    rating: 4.9,
    pages: 320,
    cover: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80",
    blurb: "Practical systems for behavior change that actually stick.",
    description: "A tactical framework for building good habits, breaking bad ones, and mastering the tiny behaviors that drive remarkable results.",
    featured: true,
    newArrival: false,
    tags: ["Popular", "Productivity", "Toolkit"]
  }
];

async function main() {
  for (const book of books) {
    await prisma.book.upsert({
      where: { slug: book.slug },
      update: book,
      create: book
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
