export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  location?: string;
  avatar: string;
  featured?: boolean;
};

export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  format: string;
  category: string;
  rating: number;
  pages: number;
  cover: string;
  blurb: string;
  description: string;
  longDescription: string;
  tags: string[];
  featured?: boolean;
  newArrival?: boolean;
  reviews: Review[];
};

export const books: Book[] = [
  {
    id: "1",
    slug: "the-midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 18,
    format: "Hardcover",
    category: "Fiction",
    rating: 4.8,
    pages: 304,
    cover: "/books/midnight-library.png",
    blurb:
      "A luminous novel about regret, possibility, and choosing your life.",
    description:
      "A beautifully emotional story about second chances, wonder, and the many lives we imagine for ourselves.",
    longDescription:
      "Between life and death sits a library full of unlived stories. Nora Seed steps through alternate versions of her future, learning that fulfillment is built through courage, tenderness, and choice.",
    tags: ["Bestseller", "Atmospheric", "Staff Pick"],
    featured: true,
    newArrival: true,
    reviews: [
      {
        id: "r1",
        name: "Maya",
        rating: 5,
        comment:
          "Tender, comforting, and impossible to put down. The design of this page suits the book perfectly.",
        location: "Portland",
        avatar: "/avatars/avatar-1.png",
        featured: true,
      },
      {
        id: "r2",
        name: "Theo",
        rating: 4,
        comment:
          "A reflective read with a beautiful emotional arc. I came for the premise and stayed for the heart.",
        location: "Chicago",
        avatar: "/avatars/avatar-2.png",
      },
    ],
  },
  {
    id: "2",
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    price: 22,
    format: "Paperback",
    category: "Self Improvement",
    rating: 4.9,
    pages: 320,
    cover: "/books/atomic-habits.png",
    blurb: "Practical systems for behavior change that actually stick.",
    description:
      "Tiny changes compound into meaningful transformation with this highly actionable classic.",
    longDescription:
      "James Clear breaks improvement into repeatable systems, showing how identity, environment, and consistency shape better routines. It is sharp, clear, and easy to apply right away.",
    tags: ["Popular", "Productivity", "Toolkit"],
    featured: true,
    reviews: [
      {
        id: "r3",
        name: "Sofia",
        rating: 5,
        comment:
          "Clear, practical, and genuinely useful. The checkout flow for this store feels just as clean.",
        location: "Austin",
        avatar: "/avatars/avatar-3.png",
        featured: true,
      },
      {
        id: "r4",
        name: "Daniel",
        rating: 5,
        comment:
          "One of the most actionable books I have read. Easy to revisit whenever routines drift.",
        location: "Boston",
        avatar: "/avatars/avatar-4.png",
      },
    ],
  },
  {
    id: "3",
    slug: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 24,
    format: "Hardcover",
    category: "Sci-Fi",
    rating: 4.7,
    pages: 496,
    cover: "/books/project-hail-mary.png",
    blurb: "A hilarious and high-stakes mission to save humanity.",
    description:
      "One astronaut wakes up alone in space with science, memory gaps, and all of Earth depending on him.",
    longDescription:
      "Andy Weir balances hard science with cinematic pacing and genuine warmth. The result is a page-turning survival story that feels massive, funny, and deeply human.",
    tags: ["Adventure", "Space", "Cinematic"],
    newArrival: true,
    reviews: [
      {
        id: "r5",
        name: "Nina",
        rating: 5,
        comment:
          "Big, thrilling, and surprisingly funny. This is the kind of recommendation card that deserves a hero slot.",
        location: "Seattle",
        avatar: "/avatars/avatar-5.png",
        featured: true,
      },
      {
        id: "r6",
        name: "Marcus",
        rating: 4,
        comment:
          "Fast-paced science fiction with real charm. I would recommend it to almost anyone.",
        location: "Denver",
        avatar: "/avatars/avatar-6.png",
      },
    ],
  },
  {
    id: "4",
    slug: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    price: 19,
    format: "Paperback",
    category: "Business",
    rating: 4.6,
    pages: 304,
    cover: "/books/deep-work.png",
    blurb: "Train your focus in a distracted world.",
    description:
      "A practical framework for protecting attention and producing better work with less noise.",
    longDescription:
      "Cal Newport argues that focused concentration is one of the most valuable skills in modern knowledge work. He pairs the thesis with rituals and structures readers can adopt immediately.",
    tags: ["Focus", "Nonfiction", "Classic"],
    reviews: [
      {
        id: "r7",
        name: "Leah",
        rating: 4,
        comment:
          "Excellent if you want a more intentional work rhythm. Strong ideas, clearly presented.",
        location: "San Diego",
        avatar: "/avatars/avatar-7.png",
        featured: true,
      },
      {
        id: "r8",
        name: "Owen",
        rating: 5,
        comment:
          "This book changed the way I schedule my day. Focus feels trainable again.",
        location: "Atlanta",
        avatar: "/avatars/avatar-8.png",
      },
    ],
  },
  {
    id: "5",
    slug: "before-the-coffee-gets-cold",
    title: "Before the Coffee Gets Cold",
    author: "Toshikazu Kawaguchi",
    price: 17,
    format: "Paperback",
    category: "Magical Realism",
    rating: 4.5,
    pages: 272,
    cover: "/books/before-the-coffee-gets-cold.png",
    blurb: "Tender, time-bending stories in a quiet Tokyo cafe.",
    description:
      "Warm, wistful, and intimate stories about the moments we wish we could revisit.",
    longDescription:
      "Inside one special cafe, customers can briefly travel through time, but only under precise conditions. The novel turns that gentle premise into heartfelt reflections on love, grief, and unfinished words.",
    tags: ["Emotional", "International", "Short Read"],
    reviews: [
      {
        id: "r9",
        name: "Iris",
        rating: 5,
        comment:
          "Gentle and heartbreaking in the best way. It feels like a quiet afternoon in book form.",
        location: "Brooklyn",
        avatar: "/avatars/avatar-9.png",
        featured: true,
      },
      {
        id: "r10",
        name: "Jon",
        rating: 4,
        comment:
          "Short, thoughtful, and very easy to recommend to friends who enjoy emotional fiction.",
        location: "Phoenix",
        avatar: "/avatars/avatar-10.png",
      },
    ],
  },
  {
    id: "6",
    slug: "the-creative-act",
    title: "The Creative Act",
    author: "Rick Rubin",
    price: 26,
    format: "Hardcover",
    category: "Creativity",
    rating: 4.4,
    pages: 432,
    cover: "/books/the-creative-act.png",
    blurb: "A meditative guide to making things with more soul.",
    description:
      "Part philosophy and part practice, this is a giftable read for artists and curious makers.",
    longDescription:
      "Rick Rubin explores creativity as a way of paying attention to the world. Rather than prescribing formulas, the book invites readers into a calmer and more generous creative rhythm.",
    tags: ["Art", "Mindset", "Giftable"],
    featured: true,
    reviews: [
      {
        id: "r11",
        name: "Ava",
        rating: 4,
        comment:
          "Beautifully paced and surprisingly calming. It encourages reflection more than hustle.",
        location: "Nashville",
        avatar: "/avatars/avatar-1.png",
        featured: true,
      },
      {
        id: "r12",
        name: "Noah",
        rating: 5,
        comment:
          "One of the most giftable books on creativity I have seen in years.",
        location: "Los Angeles",
        avatar: "/avatars/avatar-2.png",
      },
    ],
  },
  {
    id: "7",
    slug: "a-little-life",
    title: "A Little Life",
    author: "Hanya Yanagihara",
    price: 23,
    format: "Paperback",
    category: "Literary Fiction",
    rating: 4.6,
    pages: 832,
    cover: "/books/a-little-life.png",
    blurb: "A sweeping, intimate portrait of friendship, pain, and endurance.",
    description:
      "A modern literary landmark about the bonds that hold us together through adulthood.",
    longDescription:
      "This expansive novel follows four friends in New York as their lives diverge and deepen. It is emotionally rich, intensely observed, and unforgettable in scope.",
    tags: ["Epic", "Book Club", "Literary"],
    newArrival: true,
    reviews: [
      {
        id: "r13",
        name: "Elena",
        rating: 5,
        comment:
          "Devastating and unforgettable. Definitely one for readers who want something immersive.",
        location: "Miami",
        avatar: "/avatars/avatar-3.png",
        featured: true,
      },
      {
        id: "r14",
        name: "Grant",
        rating: 4,
        comment:
          "A major emotional commitment, but absolutely worth the time if you love literary fiction.",
        location: "Philadelphia",
        avatar: "/avatars/avatar-4.png",
      },
    ],
  },
  {
    id: "8",
    slug: "klara-and-the-sun",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    price: 21,
    format: "Hardcover",
    category: "Contemporary",
    rating: 4.5,
    pages: 320,
    cover: "/books/klara-and-the-sun.png",
    blurb:
      "A quiet, haunting story about love, care, and what it means to be human.",
    description:
      "Ishiguro delivers an elegant near-future novel with restraint, beauty, and emotional depth.",
    longDescription:
      "Told through the observant voice of an artificial friend, the novel reflects on devotion, loneliness, and sacrifice. Its speculative ideas stay grounded in tenderness and character.",
    tags: ["Award Winner", "Elegant", "Speculative"],
    featured: true,
    reviews: [
      {
        id: "r15",
        name: "Priya",
        rating: 5,
        comment:
          "Quietly moving and so elegantly written. The whole BookMook mood fits this title.",
        location: "New York",
        avatar: "/avatars/avatar-5.png",
        featured: true,
      },
      {
        id: "r16",
        name: "Cole",
        rating: 4,
        comment:
          "A restrained but emotionally rich speculative novel. It lingers after the last page.",
        location: "Minneapolis",
        avatar: "/avatars/avatar-6.png",
      },
    ],
  },
];

export const categories = Array.from(
  new Set(books.map((book) => book.category)),
);

export const featuredBooks = books.filter((book) => book.featured);
export const newArrivals = books.filter((book) => book.newArrival);

export const featuredReviews = books
  .flatMap((book) =>
    book.reviews.map((review) => ({
      ...review,
      bookTitle: book.title,
      bookSlug: book.slug,
    })),
  )
  .filter((review) => review.featured)
  .slice(0, 10);

export function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug);
}

export function getRelatedBooks(category: string, currentSlug: string) {
  return books
    .filter((book) => book.category === category && book.slug !== currentSlug)
    .slice(0, 3);
}
