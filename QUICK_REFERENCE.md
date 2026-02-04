# Quick Reference - Admin Panel

Panduan cepat operasi CRUD untuk admin.

---

## Operasi Dasar CRUD

### CREATE (Tambah Data)
```
1. Klik menu di sidebar
2. Klik tombol "Add [Nama Menu]" (hijau, pojok kanan atas)
3. Isi form
4. Klik "Save" atau "Publish"
```

### READ (Lihat Data)
```
1. Klik menu di sidebar
2. Gunakan search bar untuk cari
3. Gunakan filter untuk saring data
4. Klik nomor halaman untuk navigasi
```

### UPDATE (Edit Data)
```
1. Cari data yang ingin diedit
2. Klik tombol Edit (ikon pensil)
3. Ubah data
4. Klik "Save"
```

### DELETE (Hapus Data)
```
1. Cari data yang ingin dihapus
2. Klik tombol Delete (ikon tempat sampah)
3. Konfirmasi penghapusan
4. Data terhapus permanen
```

---

## Akses Menu per Role

| Menu       | Super Admin | Admin | Kontributor |
|------------|-------------|-------|-------------|
| Dashboard  | ✓           | ✓     | ✓           |
| Articles   | ✓           | ✓     | ✓*          |
| Events     | ✓           | ✓     | ✓           |
| Leadership | ✓           | ✓     | ✗           |
| Alumni     | ✓ (view)    | ✓ (view) | ✗        |
| Timeline   | ✓           | ✓     | ✗           |
| Users      | ✓           | ✗     | ✗           |
| Settings   | ✓           | ✓     | ✗           |

*Kontributor hanya bisa edit/hapus artikel sendiri yang berstatus Draft

---

## Shortcut & Tips

### Search
- Ketik di search bar
- Tekan Enter atau tunggu 500ms

### Filter
- Klik dropdown filter
- Pilih opsi
- Data otomatis ter-filter

### Pagination
- **Next/Previous**: navigasi halaman
- **Klik nomor**: langsung ke halaman
- Default: 10 data per halaman

### Notifikasi
- **Hijau**: Sukses
- **Merah**: Error
- **Kuning**: Warning
- Auto dismiss dalam 3 detik

---

## Status Artikel

| Status    | Artinya                          |
|-----------|----------------------------------|
| Draft     | Belum selesai, bisa diedit       |
| Pending   | Menunggu review                  |
| Published | Sudah terbit di website publik   |
| Archived  | Disimpan, tidak tampil di publik |

---

## Kategori Artikel

- **Post**: Artikel umum
- **Blog**: Blog post
- **Opinion**: Opini/pendapat
- **Publication**: Publikasi resmi
- **Info**: Informasi/pengumuman

---

## Tombol Aksi

| Ikon      | Fungsi          |
|-----------|-----------------|
| ✏️ Pensil  | Edit            |
| 🗑️ Sampah  | Delete          |
| 👁️ Mata    | View/Preview    |
| ✓ Check   | Publish         |
| ✗ Cross   | Unpublish       |

---

## Field Wajib vs Opsional

### Articles
**Wajib**: Title, Category, Content
**Opsional**: Slug (auto), Featured Image, Published At

### Events
**Wajib**: Title, Description, Event Date
**Opsional**: Location, Image, Registration Link

### Leadership
**Wajib**: Name, NIM, Position, Period Start, Period End, Batch
**Opsional**: Email, Phone, Photo, Division

### Timeline
**Wajib**: Year, Title, Description
**Opsional**: Image

### Users
**Wajib**: Email, Full Name, Password, Role
**Opsional**: -

---

## Troubleshooting Cepat

| Masalah                    | Solusi                              |
|----------------------------|-------------------------------------|
| Tidak bisa login           | Cek email/password, hubungi admin   |
| Tidak bisa publish         | Cek role (kontributor tidak bisa)   |
| Data tidak muncul          | Refresh (F5), clear cache           |
| Upload gambar gagal        | Cek ukuran (<2MB), format (JPG/PNG) |
| Error saat save            | Cek field wajib sudah diisi         |
| Tombol tidak muncul        | Cek role/permission                 |

---

**Versi 1.0 - Updated: Feb 2026**
