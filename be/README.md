# NucleoMonitor REST API — NestJS, PostgreSQL, Prisma

Backend aplikasi NucleoMonitor Week 10. Controller mendelegasikan operasi ke service; PrismaService mengelola koneksi PostgreSQL melalui Prisma Client.

## Setup

Dari root proyek, pasang semua workspace dengan `npm install`. Buat database PostgreSQL `nucleomonitor`, lalu salin `be/.env.example` menjadi `be/.env` dan atur `DATABASE_URL` sesuai kredensial lokal.

Jalankan dari folder `be`:

    npm run db:generate
    npm run db:migrate -- --name init
    npm run db:seed
    npm run dev

API tersedia pada `http://localhost:3000/api`. Jalankan frontend dari root dengan `npm run dev:fe`.

## Endpoint

- GET `/api/health`
- GET `/api/facilities`
- GET `/api/monitoring`, dengan filter opsional `?type=Udara`, `?type=Air`, atau `?type=Tanah`
- GET `/api/reports` dan GET `/api/reports/:id`
- POST `/api/reports`, PUT `/api/reports/:id`, DELETE `/api/reports/:id`
- GET `/api/community-notes`

Create report menerima JSON berisi `id`, `category`, `date` (YYYY-MM-DD), `status`, dan `description`. Seed mengisi data contoh dari proyek Week 9. `GET /api/monitoring?type=...` juga menjadi contoh query filter Prisma.

Model database dan seed ada di `prisma/schema.prisma` dan `prisma/seed.ts`. Screenshot tahapan pengerjaan diminta di `../docs/screenshots/` sesuai instruksi tugas.

