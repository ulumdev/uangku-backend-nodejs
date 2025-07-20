# Uangku Backend - Database Migration & Seeding Guide

Panduan ini berisi perintah-perintah penting untuk mengelola database menggunakan Sequelize CLI, khususnya terkait migrasi dan seeder data.

---

## 1. **Rollback Semua Migrasi (Drop Table)**

Menghapus semua migrasi dan mengosongkan database:

```bash
npx sequelize-cli db:migrate:undo:all
```

---

## 2. **Menjalankan Migrasi (Membuat Struktur Database)**

Menerapkan semua migrasi untuk membangun ulang seluruh tabel:

```bash
npx sequelize-cli db:migrate
```

---

## 3. **Rollback Seeder (Hapus Data Seeder)**

Menghapus semua data yang sudah di-seed:

```bash
npx sequelize-cli db:seed:undo:all
```

---

## 4. **Menjalankan Seeder (Menambah Data Awal)**

Mengisi database dengan data awal sesuai file seeder:

```bash
npx sequelize-cli db:seed:all
```

---

## 5. **Menjalankan Migrasi atau Seeder Tertentu**

Menjalankan satu file migrasi tertentu:

```bash
npx sequelize-cli db:migrate --name <nama-file-migration>.js
```

Menjalankan satu file seeder tertentu:

```bash
npx sequelize-cli db:seed --seed <nama-file-seeder>.js
```

---

## 6. **Tips**

- Pastikan file migration, model, dan seeder sudah sesuai kebutuhan.
- Setelah rollback dan migrate lagi, jangan lupa menjalankan seeder agar data awal kembali tersedia.
- Untuk melihat status migrasi:
  ```bash
  npx sequelize-cli db:migrate:status
  ```
- Untuk melihat daftar seeder:
  ```bash
  npx sequelize-cli db:seed:status
  ```

---

## 7. **Referensi Dokumentasi**

- [Sequelize CLI Docs](https://sequelize.org/master/manual/migrations.html)

---

Selamat mengelola database!
