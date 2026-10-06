# 🚀 Skycrest — Backend & Admin Panel Setup Guide

This guide provides step-by-step instructions to configure Supabase authentication, database tables, Row Level Security (RLS) policies, storage buckets, and the admin management panel for **Skycrest Building Contracting LLC**.

---

## 📋 Table of Contents
1. [Prerequisites & Dependencies](#1-prerequisites--dependencies)
2. [Supabase Project Setup & Environment Variables](#2-supabase-project-setup--environment-variables)
3. [Database Schema & Seed Data](#3-database-schema--seed-data)
4. [Create Admin User & Register Permissions](#4-create-admin-user--register-permissions)
5. [Local Development Execution](#5-local-development-execution)

---

## 1. Prerequisites & Dependencies

All required Supabase packages have been installed:
- `@supabase/supabase-js`
- `@supabase/ssr`

If setting up on a fresh machine, run:
```bash
npm install
```

---

## 2. Supabase Project Setup & Environment Variables

1. Go to [Supabase Console](https://database.new) and create a new project.
2. Navigate to **Project Settings -> API** to retrieve your project credentials:
   - `Project URL`
   - `anon / public` API Key
3. Copy `.env.local.example` to `.env.local` in your root directory:
   ```bash
   cp .env.local.example .env.local
   ```
4. Fill in your environment credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## 3. Database Schema & Seed Data

1. Open your Supabase Dashboard and go to the **SQL Editor**.
2. Copy the contents of [`supabase/schema.sql`](file:///home/kali/Desktop/web/Skycrest/supabase/schema.sql) into the SQL Editor and click **Run**:
   - Creates `admins`, `contact_submissions`, and `projects` tables.
   - Configures the `is_admin()` SECURITY DEFINER function.
   - Enforces strict Row Level Security (RLS) policies.
   - Initializes the public storage bucket `project-images` with admin-only write permissions.
3. Copy the contents of [`supabase/seed.sql`](file:///home/kali/Desktop/web/Skycrest/supabase/seed.sql) into the SQL Editor and click **Run**:
   - Populates the initial portfolio of 13 flagship Skycrest projects.

---

## 4. Create Admin User & Register Permissions

1. In the Supabase Dashboard, go to **Authentication -> Users**.
2. Click **Add User -> Create User**:
   - Enter your Admin Email (e.g. `admin@skycrest-eng.com`).
   - Enter a secure Password.
   - Click **Create User**.
3. Go back to the **SQL Editor** and insert your admin email into the `admins` table:
   ```sql
   INSERT INTO public.admins (email) VALUES ('admin@skycrest-eng.com');
   ```

---

## 5. Local Development Execution

Launch the Next.js development server:
```bash
npm run dev
```

### Access Points:
- **Public Corporate Portal**: `http://localhost:3000`
- **Admin Panel Login**: `http://localhost:3000/admin/login`
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Inquiries / Messages**: `http://localhost:3000/admin/messages`
- **Project Catalog Management**: `http://localhost:3000/admin/projects`
