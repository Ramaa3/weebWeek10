# NucleoMonitor — Tugas 10

Proyek ini melanjutkan NucleoMonitor dari Week 9. Frontend React tetap menggunakan endpoint yang sama. Backend NestJS sekarang menyimpan data permanen di PostgreSQL melalui Prisma ORM.

## Menjalankan aplikasi

1. Pasang Node.js dan PostgreSQL, lalu buat database `nucleomonitor`.
2. Dari folder proyek ini, jalankan `npm install` agar dependensi frontend dan backend terpasang.
3. Salin `be/.env.example` ke `be/.env`, lalu sesuaikan `DATABASE_URL` dengan user, password, host, dan nama database PostgreSQL Anda.
4. Dari folder `be`, jalankan `npm run db:generate`, `npm run db:migrate -- --name init`, `npm run db:seed`, lalu `npm run dev`.
5. Dari terminal lain pada folder proyek, jalankan `npm run dev:fe`.

Frontend berjalan pada `http://localhost:5173` dan API pada `http://localhost:3000`. Lihat [panduan API](be/README.md).

## Screenshot pengumpulan

Simpan screenshot tahapan instalasi/migrasi/seed dan tampilan aplikasi desktop serta mobile di `docs/screenshots/`, lalu sematkan di README ini sebelum mengumpulkan tugas. Screenshot harus berasal dari proses dan aplikasi yang benar-benar dijalankan pada komputer Anda.
