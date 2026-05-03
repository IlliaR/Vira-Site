import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ── Admin user ────────────────────────────────────────────────────────────
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'changeme123';
  const hash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hash },
  });

  console.log(`✓ Admin user: ${email}`);

  // ── Categories ────────────────────────────────────────────────────────────
  const categories = [
    { slug: 'blackwork', nameEn: 'Blackwork', nameDe: 'Blackwork', order: 1 },
    { slug: 'fine-line', nameEn: 'Fine Line', nameDe: 'Fine Line', order: 2 },
    { slug: 'traditional', nameEn: 'Traditional', nameDe: 'Traditional', order: 3 },
    { slug: 'illustration', nameEn: 'Illustration', nameDe: 'Illustration', order: 4 },
    { slug: 'flash', nameEn: 'Flash Sheets', nameDe: 'Flash-Sheets', order: 5 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log(`✓ ${categories.length} categories`);

  // ── Text blocks ───────────────────────────────────────────────────────────
  const textBlocks = [
    {
      page: 'home',
      key: 'hero.tagline',
      valueEn: 'Tattoo artist & illustrator based in Berlin',
      valueDe: 'Tätowiererin & Illustratorin in Berlin',
    },
    {
      page: 'home',
      key: 'intro.text',
      valueEn:
        "I work with ink the way I think — slowly, intentionally, and with deep attention to the story behind every piece. My studio is a quiet space where we figure out together what lives on your skin forever.",
      valueDe:
        'Ich arbeite mit Tinte so, wie ich denke — langsam, bewusst und mit tiefer Aufmerksamkeit für die Geschichte hinter jedem Stück. Mein Studio ist ein ruhiger Ort, an dem wir gemeinsam herausfinden, was für immer auf deiner Haut lebt.',
    },
    {
      page: 'home',
      key: 'quote.text',
      valueEn: '"Every line is a decision. Every piece, a collaboration."',
      valueDe: '„Jede Linie ist eine Entscheidung. Jedes Stück, eine Zusammenarbeit."',
    },
    {
      page: 'home',
      key: 'quote.author',
      valueEn: '— Vira Linevych',
      valueDe: '— Vira Linevych',
    },
    {
      page: 'about',
      key: 'bio',
      valueEn:
        "I grew up drawing everything I could see, and eventually tattooing became the most honest extension of that impulse. After years of apprenticeship and illustration work across Berlin and Kyiv, I opened my own studio — a place that feels as much like an art space as a tattoo shop.\n\nI specialize in blackwork, fine line, and illustration-based tattoos. I believe in thorough consultation, meaningful design, and the kind of work that improves with age. Whether you're looking for something small and poetic or a large-scale custom piece, I approach every project with the same care.",
      valueDe:
        'Ich bin mit dem Zeichnen aufgewachsen — alles, was ich sehen konnte. Das Tätowieren wurde zur ehrlichsten Erweiterung dieses Impulses. Nach Jahren der Lehre und Illustrationsarbeit in Berlin und Kiew eröffnete ich mein eigenes Studio — ein Ort, der sich sowohl wie ein Kunstraum als auch wie ein Tattooshop anfühlt.\n\nIch spezialisiere mich auf Blackwork, Fine Line und illustrationsbasierte Tattoos. Ich glaube an gründliche Beratung, sinnvolles Design und Arbeit, die mit der Zeit besser wird.',
    },
    {
      page: 'contact',
      key: 'intro',
      valueEn:
        'Ready to start? Fill in the form below with as much detail as you can. I read every inquiry personally and respond within 3–5 business days.',
      valueDe:
        'Bereit anzufangen? Fülle das Formular unten so detailliert wie möglich aus. Ich lese jede Anfrage persönlich und antworte innerhalb von 3–5 Werktagen.',
    },
  ];

  for (const block of textBlocks) {
    await prisma.textBlock.upsert({
      where: { page_key: { page: block.page, key: block.key } },
      update: {},
      create: block,
    });
  }

  console.log(`✓ ${textBlocks.length} text blocks`);

  // ── Links ─────────────────────────────────────────────────────────────────
  const links = [
    { label: 'Instagram', url: 'https://instagram.com/', type: 'social', icon: 'instagram', order: 1 },
    { label: 'TikTok', url: 'https://tiktok.com/', type: 'social', icon: 'tiktok', order: 2 },
    { label: 'Book a session', url: '/contact', type: 'booking', icon: 'calendar', order: 3 },
  ];

  for (const link of links) {
    const existing = await prisma.link.findFirst({ where: { label: link.label } });
    if (!existing) await prisma.link.create({ data: link });
  }

  console.log(`✓ ${links.length} links`);

  // ── Project cases ─────────────────────────────────────────────────────────
  const blackworkCat = await prisma.category.findUnique({ where: { slug: 'blackwork' } });
  const fineLineCat = await prisma.category.findUnique({ where: { slug: 'fine-line' } });
  const illustrationCat = await prisma.category.findUnique({ where: { slug: 'illustration' } });
  const flashCat = await prisma.category.findUnique({ where: { slug: 'flash' } });

  const projects = [
    {
      titleEn: 'Blackwork',
      titleDe: 'Blackwork',
      descriptionEn: 'Bold geometric and organic blackwork pieces — from small precise details to full sleeve compositions.',
      descriptionDe: 'Kräftige geometrische und organische Blackwork-Stücke — von kleinen präzisen Details bis zu vollständigen Sleeve-Kompositionen.',
      heroImage: '/images/placeholder-blackwork.jpg',
      categoryId: blackworkCat?.id,
      linkTarget: '/gallery?category=blackwork',
      order: 1,
    },
    {
      titleEn: 'Fine Line',
      titleDe: 'Fine Line',
      descriptionEn: 'Delicate single-needle and fine line work. Botanical illustrations, portraits, and minimal motifs.',
      descriptionDe: 'Zarte Einzelnadel- und Fine-Line-Arbeiten. Botanische Illustrationen, Porträts und minimale Motive.',
      heroImage: '/images/placeholder-fineline.jpg',
      categoryId: fineLineCat?.id,
      linkTarget: '/gallery?category=fine-line',
      order: 2,
    },
    {
      titleEn: 'Illustration Commissions',
      titleDe: 'Illustrationsaufträge',
      descriptionEn: 'Custom illustration work for print, merchandise, and independent publications.',
      descriptionDe: 'Individuelle Illustrationsarbeiten für Druck, Merchandise und unabhängige Publikationen.',
      heroImage: '/images/placeholder-illustration.jpg',
      categoryId: illustrationCat?.id,
      linkTarget: '/gallery?category=illustration',
      order: 3,
    },
    {
      titleEn: 'Flash Sheets',
      titleDe: 'Flash-Sheets',
      descriptionEn: 'Ready-to-tattoo flash designs. Available as-is or with small personal adjustments.',
      descriptionDe: 'Sofort tätowierbare Flash-Designs. Als solches verfügbar oder mit kleinen persönlichen Anpassungen.',
      heroImage: '/images/placeholder-flash.jpg',
      categoryId: flashCat?.id,
      linkTarget: '/gallery?category=flash',
      order: 4,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.projectCase.findFirst({ where: { titleEn: project.titleEn } });
    if (!existing) await prisma.projectCase.create({ data: project });
  }

  console.log(`✓ ${projects.length} project cases`);

  console.log('\n✅ Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
