import { config } from "dotenv"; config({ path: [".env.local", ".env"] });
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { products, productCategories } from "../src/data/products";
import { services, industries } from "../src/data/services";
import { projects, posts } from "../src/data/content";

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  for (const c of productCategories) {
    await db.productCategory.upsert({ where: { slug: c.slug }, update: { name: c.name }, create: c });
  }
  for (const p of products) {
    const cat = await db.productCategory.findUniqueOrThrow({ where: { slug: p.category } });
    const { category: _c, ...rest } = p;
    const data = { ...rest, categoryId: cat.id, featured: !!p.featured, isSample: true };
    await db.product.upsert({ where: { slug: p.slug }, update: data, create: data });
  }
  for (const [i, s] of services.entries()) {
    await db.service.upsert({ where: { slug: s.slug }, update: { ...s, order: i }, create: { ...s, order: i } });
  }
  for (const [i, s] of industries.entries()) {
    await db.industry.upsert({ where: { slug: s.slug }, update: { ...s, order: i }, create: { ...s, order: i } });
  }
  for (const p of projects) {
    await db.project.upsert({ where: { slug: p.slug }, update: p, create: { ...p, isSample: true } });
  }
  for (const [i, p] of posts.entries()) {
    const d = { ...p, published: true, publishedAt: new Date(Date.now() - i * 6 * 86400000) };
    await db.post.upsert({ where: { slug: p.slug }, update: d, create: d });
  }
  const email = process.env.ADMIN_EMAIL, password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 12);
    await db.user.upsert({ where: { email }, update: { passwordHash }, create: { email, passwordHash, name: "Admin" } });
    console.log("Admin user ready:", email);
  }
  console.log(`Seeded ${products.length} products, ${services.length} services, ${industries.length} industries, ${projects.length} projects, ${posts.length} posts.`);
}
main().finally(() => db.$disconnect());
