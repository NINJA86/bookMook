# Bookmook

A polished bookstore app built with Next.js App Router, TypeScript, Tailwind, shadcn-inspired UI primitives, and Prisma/PostgreSQL.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- next-themes
- react-hook-form + zod

## Features

- Editorial landing page with premium bookstore styling
- Catalog grid and dynamic book detail pages
- Reader tools page with bundle builder and reading-time calculator
- Newsletter subscription API route
- Prisma schema for books and subscribers

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env`:

   ```bash
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/bookmook"
   ```

3. Generate the Prisma client and push the schema:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

## Key files

- `app/page.tsx` home storefront
- `app/books/[slug]/page.tsx` product details
- `app/tools/page.tsx` interactive reader tools
- `app/api/newsletter/route.ts` newsletter endpoint
- `prisma/schema.prisma` PostgreSQL models
