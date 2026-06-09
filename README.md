# Vira Linevych — Tattoo Artist & Illustrator Website

Welcome to the repository for the official website of Vira Linevych. This project is built using **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Prisma**, **SQLite** (by default for easy local development), and **NextAuth** for secure admin authentication.

---

## 🚀 Quick Start & Local Setup

Follow these steps to set up and run the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or v20 recommended)
- npm (comes bundled with Node.js)

---

### Step 2: Navigate to the Site Folder
Navigate to the `tattoo-site` directory:
```bash
cd tattoo-site
```

### Step 3: Install Dependencies
Install all package dependencies:
```bash
npm install
```
> **Windows Note:** `sharp` (the image processing library used by Next.js) is a native module. If you encounter installation or build errors on Windows, run:
> `npm install --ignore-scripts`
> followed by:
> `npm install @img/sharp-win32-x64`

### Step 4: Configure Environment Variables
Copy the template configuration file to create your local `.env` file:
```bash
cp .env.example .env
```
Open the newly created `.env` file in your editor and configure the variables. The defaults are already configured for SQLite:
* `DATABASE_URL="file:./dev.db"` (stores your local SQLite database)
* `NEXTAUTH_SECRET`: Set to any random string for local security.
* `NEXTAUTH_URL="http://localhost:3000"`

### Step 5: Setup Database & Seed Default Data
Create the local SQLite database, apply the database schema, and seed initial data (including the default administrator account):

```bash
# 1. Sync the Prisma schema to generate the SQLite database
npm run db:push

# 2. Seed default categories, text blocks, projects, and the admin user
npm run db:seed:win
```

### Step 6: Start the Development Server
Run the project in development mode:
```bash
npm run dev
```

The site will now be running at:
* **Public Site**: [http://localhost:3000](http://localhost:3000) (Redirects to German `/de` by default)
* **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔐 Admin Panel Guide

The site includes a comprehensive admin dashboard to manage all dynamic elements without editing code.

### How to Access & Log In
1. Open [http://localhost:3000/admin](http://localhost:3000/admin) (or `https://yourdomain.de/admin` in production).
2. Enter the default administrator credentials created during the seed step:
   * **Email**: `admin@example.com`
   * **Password**: `changeme123`

> [!WARNING]
> For security, change these credentials immediately upon your first login. You can modify the password directly in the database using Prisma Studio by running `npm run db:studio` inside the `tattoo-site` folder.

---

### 🎨 Admin Functions & Panel Management

Once logged in, you can manage the following sections:

| Feature | Description | How to Use |
| :--- | :--- | :--- |
| **🖼️ Gallery** | Manage the tattoo/illustration portfolio. | Upload images (drag & drop), add descriptive Alt Text in English and German, assign to a style category, and mark as "Featured" to display on the home page. |
| **📁 Project Cases** | Update the showcase cards on the home page. | Edit the 4 highlight cards (Blackwork, Fineline, Illustration, Flash) with titles, descriptions, and custom hero cover images. |
| **✏️ Content Blocks** | Edit the text on the website dynamically. | Edit section headings, introduction text, and descriptive paragraphs in both German (DE) and English (EN) directly from the text fields. |
| **🔗 Quick Links** | Manage social and booking navigation links. | Update external social profile links (Instagram, TikTok) and third-party booking integrations. |
| **✉️ Subscribers** | Newsletter mailing list manager. | View a list of all visitors who signed up for the newsletter. You can export the email list to CSV or delete users to comply with GDPR. |
| **📥 Inquiries** | View submissions from the contact form. | Read details from potential clients (name, email, description, placement, size) and mark them as "Handled" or "Archive". |
