# Vira Linevych — Tattoo Artist & Illustrator Website

Next.js 14 · TypeScript · Tailwind · Prisma · SQLite → Postgres · NextAuth · Resend · sharp · framer-motion · next-intl (DE/EN)

---

## Quick start (local dev)

### 1. Install dependencies

```bash
cd tattoo-site
npm install
```

> **Windows note:** `sharp` is a native module. If you hit build errors on Windows,
> run `npm install --ignore-scripts` and install the sharp prebuilt:
> `npm install @img/sharp-win32-x64`

---

### 2. Self-hosted fonts

The site uses **Cormorant Garamond** (display / italic) and **Inter** (body).
Download them from Google Fonts (one-time, offline use — no CDN):

1. Go to <https://fonts.google.com/specimen/Cormorant+Garamond> → Download family
2. Go to <https://fonts.google.com/specimen/Inter> → Download family
3. Convert `.ttf` → `.woff2` using <https://www.fontsquirrel.com/tools/webfont-generator>
   or use the prebuilt woff2 files from the Google Fonts GitHub repo.
4. Place files in `public/fonts/`:

```
public/fonts/
  CormorantGaramond-Regular.woff2
  CormorantGaramond-Italic.woff2
  CormorantGaramond-BoldItalic.woff2
  Inter-Regular.woff2
  Inter-Medium.woff2
  Inter-SemiBold.woff2
```

---

### 3. Environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite path (default: `file:./dev.db`) |
| `NEXTAUTH_SECRET` | Random 32-char string (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `http://localhost:3000` in dev |
| `RESEND_API_KEY` | From <https://resend.com> |
| `RESEND_FROM_EMAIL` | Verified sender address |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | From <https://www.hcaptcha.com> |
| `HCAPTCHA_SECRET_KEY` | hCaptcha secret |
| `NEXT_PUBLIC_SITE_URL` | Full site URL |

---

### 4. Database setup & seed

```bash
npm run db:push        # creates SQLite DB + applies schema
npm run db:seed        # creates admin user + placeholder content
```

Admin credentials after seed:
- Email: `admin@example.com`
- Password: `changeme123`

Change these immediately after first login via `prisma studio`:
```bash
npm run db:studio
```

---

### 5. Placeholder images

Upload real images via the admin panel. In the meantime, add placeholder images:

```
public/images/
  placeholder-hero.jpg          (landscape, ~1920×1080)
  placeholder-portrait.jpg      (portrait, ~800×1000)
  placeholder-process.jpg       (any, studio/process shot)
  placeholder-divider.jpg       (landscape, used as full-bleed section divider)
  placeholder-blackwork.jpg     (project card)
  placeholder-fineline.jpg      (project card)
  placeholder-illustration.jpg  (project card)
  placeholder-flash.jpg         (project card)
```

---

### 6. Run dev server

```bash
npm run dev
```

Open <http://localhost:3000/de> (default locale is German).
Admin panel: <http://localhost:3000/admin>

---

## Production deploy — Hetzner (recommended)

### Server setup (Ubuntu 22.04)

```bash
# Install Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install nginx + certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# Install PM2
npm install -g pm2
```

### Deploy

```bash
# On server
git clone <your-repo> /var/www/tattoo-site
cd /var/www/tattoo-site/tattoo-site

npm install
cp .env.example .env   # fill with production values
npm run db:push
npm run db:seed
npm run build
pm2 start npm --name "tattoo-site" -- start
pm2 save
pm2 startup
```

### Nginx config

```nginx
server {
    server_name yoursite.de www.yoursite.de;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve uploads directly via nginx (faster than Next.js)
    location /uploads/ {
        alias /var/www/tattoo-site/tattoo-site/public/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
sudo certbot --nginx -d yoursite.de -d www.yoursite.de
```

### Persistent uploads

The `public/uploads/` directory stores uploaded images on the server filesystem.
Since Hetzner VPS has a persistent filesystem (unlike serverless platforms), images
survive deployments. Before updating, never delete this folder.

Optionally, mount a Hetzner Volume for extra durability and backup:

```bash
# Create volume in Hetzner console, mount at /mnt/uploads
# Symlink: ln -s /mnt/uploads /var/www/tattoo-site/tattoo-site/public/uploads
```

---

## SQLite → Postgres migration

When you outgrow SQLite:

### 1. Update `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. Update `.env`

```
DATABASE_URL="postgresql://user:password@host:5432/tattoo_site?schema=public"
```

### 3. Migrate

```bash
npx prisma migrate dev --name init
npm run db:seed
```

### 4. Export SQLite data (optional)

Use `prisma db pull` + a migration tool like `pgloader` to transfer existing data.

**Recommended Postgres on Hetzner:** Use [Hetzner Managed Databases](https://www.hetzner.com/databases)
or self-host PostgreSQL on the same server.

---

## Admin panel guide (non-technical)

Go to `yoursite.de/admin` and log in.

| Section | What you can do |
|---|---|
| **Gallery** | Drag & drop images, add alt text in EN + DE, assign category, mark as featured |
| **Projects** | Edit the 4 home-page work cards (title, description, hero image) |
| **Content** | Edit any text on the site in both languages |
| **Links** | Change Instagram URL, add booking platform links |
| **Subscribers** | See newsletter list, export to spreadsheet, delete (GDPR) |
| **Inquiries** | Read booking form submissions, mark as handled |

---

## Legal checklist (before going live)

- [ ] Fill real name, address, phone, email in `/de/impressum` and `/en/impressum`
- [ ] Add USt-IdNr if you have VAT registration
- [ ] Update studio address in `/de/contact` contact page and `MapEmbed.tsx` coordinates
- [ ] Update OpenStreetMap bbox in `MapEmbed.tsx` to actual studio location
- [ ] Update Datenschutzerklärung with actual Resend/hosting processor details
- [ ] Create real hCaptcha account and replace placeholder keys
- [ ] Configure Resend with verified domain and replace placeholder emails
- [ ] Replace Instagram/TikTok URLs in `Header.tsx`, `MobileBar.tsx`, `Footer.tsx`
- [ ] Add real OG image at `public/og-image.jpg` (1200×630)
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain

---

## Lighthouse targets

| Metric | Target |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |

Key factors already implemented:
- `next/image` with WebP/AVIF output, lazy loading, explicit dimensions
- Self-hosted fonts with `font-display: swap`
- No third-party scripts before consent
- Semantic HTML, alt text required, ARIA labels
- Security headers via `next.config.ts`
- Canonical URLs, sitemap, structured data (JSON-LD)
