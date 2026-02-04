# Panduan Penggunaan Panel Admin

Panduan singkat untuk admin dalam mengelola konten website HMJF.

---

## 1. Login

1. Buka halaman admin di `[URL]/admin`
2. Masukkan email dan password yang sudah terdaftar
3. Klik tombol **Login**

---

## 2. Navigasi Sidebar

Setelah login, Anda akan melihat sidebar di sebelah kiri dengan menu:

### Menu Berdasarkan Role

**Super Admin** (akses penuh):
- Dashboard
- Articles
- Events
- Leadership
- Alumni
- Timeline
- Users
- Settings

**Admin**:
- Dashboard
- Articles
- Events
- Leadership
- Alumni
- Timeline
- Settings

**Kontributor** (penulis):
- Dashboard
- Articles (hanya artikel sendiri)
- Events

---

## 3. Mengelola Articles (Artikel)

### Melihat Daftar Artikel
1. Klik menu **Articles** di sidebar
2. Anda akan melihat daftar semua artikel
3. Gunakan **search bar** untuk mencari artikel
4. Filter artikel berdasarkan:
   - **Status**: Draft, Pending, Published, Archived
   - **Category**: Post, Blog, Opinion, Publication, Info

### Menambah Artikel Baru
1. Klik tombol **Add Article** (hijau, pojok kanan atas)
2. Isi form:
   - **Title**: Judul artikel
   - **Slug**: URL artikel (otomatis dari title)
   - **Category**: Pilih kategori
   - **Content**: Isi artikel
   - **Featured Image**: Upload gambar utama (opsional)
   - **Status**: Draft/Pending/Published
3. Klik **Save** atau **Publish**

### Mengedit Artikel
1. Cari artikel yang ingin diedit
2. Klik tombol **Edit** (ikon pensil) di baris artikel
3. Ubah data yang diperlukan
4. Klik **Save**

### Publish/Unpublish Artikel
- **Publish**: Klik tombol **Publish** untuk menerbitkan artikel
- **Unpublish**: Klik tombol **Unpublish** untuk membatalkan publikasi

### Menghapus Artikel
1. Klik tombol **Delete** (ikon tempat sampah) di baris artikel
2. Konfirmasi penghapusan
3. Artikel akan terhapus permanen

**Catatan untuk Kontributor:**
- Hanya bisa edit/hapus artikel sendiri yang masih berstatus **Draft**
- Tidak bisa publish artikel (harus minta Admin/Super Admin)

---

## 4. Mengelola Events (Acara)

### Menambah Event Baru
1. Klik menu **Events** di sidebar
2. Klik tombol **Add Event**
3. Isi form:
   - **Title**: Nama acara
   - **Description**: Deskripsi acara
   - **Event Date**: Tanggal & waktu acara
   - **Location**: Lokasi acara
   - **Image**: Upload poster/gambar (opsional)
   - **Registration Link**: Link pendaftaran (opsional)
4. Klik **Save**

### Mengedit/Menghapus Event
- Sama seperti artikel: gunakan tombol **Edit** atau **Delete**

---

## 5. Mengelola Leadership (Kepengurusan)

> Menu ini hanya untuk **Admin** dan **Super Admin**

### Menambah Pengurus Baru
1. Klik menu **Leadership** di sidebar
2. Klik tombol **Add Leadership**
3. Isi form:
   - **Name**: Nama lengkap
   - **NIM**: Nomor Induk Mahasiswa
   - **Email**: Email
   - **Phone**: Nomor HP (opsional)
   - **Photo**: Upload foto
   - **Position**: Jabatan (contoh: Ketua, Sekretaris, dll)
   - **Division**: Divisi (opsional)
   - **Period Start**: Tanggal mulai jabatan
   - **Period End**: Tanggal akhir jabatan
   - **Batch**: Angkatan
4. Klik **Save**

### Mengedit/Menghapus Pengurus
- Gunakan tombol **Edit** atau **Delete** seperti biasa

**Penting:**
- Pengurus yang **Period End**-nya sudah lewat akan otomatis masuk ke halaman **Alumni**
- Data alumni tidak bisa diedit langsung, harus edit dari halaman Leadership

---

## 6. Melihat Alumni

1. Klik menu **Alumni** di sidebar
2. Lihat daftar alumni (mantan pengurus)
3. Klik ikon **chevron** (>) untuk melihat riwayat jabatan

**Catatan:**
- Halaman ini **READ-ONLY** (tidak bisa edit/hapus)
- Data alumni otomatis muncul dari Leadership yang sudah berakhir
- Untuk edit data alumni, edit di halaman **Leadership**

---

## 7. Mengelola Timeline (Sejarah/Riwayat)

> Menu ini untuk halaman "About" bagian sejarah organisasi

### Menambah Timeline Baru
1. Klik menu **Timeline** di sidebar
2. Klik tombol **Add Timeline**
3. Isi form:
   - **Year**: Tahun kejadian
   - **Title**: Judul kejadian
   - **Description**: Deskripsi kejadian
   - **Image**: Upload gambar (opsional)
4. Klik **Save**

### Mengedit/Menghapus Timeline
- Gunakan tombol **Edit** atau **Delete**

---

## 8. Mengelola Users (Pengguna)

> Menu ini hanya untuk **Super Admin**

### Melihat Daftar User
1. Klik menu **Users** di sidebar
2. Lihat semua user yang terdaftar

### Menambah User Baru
1. Klik tombol **Add User**
2. Isi form:
   - **Email**: Email user
   - **Full Name**: Nama lengkap
   - **Password**: Password awal
   - **Role**: Pilih role (super_admin, admin, atau kontributor)
3. Klik **Save**

### Mengedit User
1. Klik tombol **Edit**
2. Ubah data (nama, role, dll)
3. Klik **Save**

### Menghapus User
- Klik tombol **Delete** dan konfirmasi

---

## 9. Settings (Pengaturan)

> Menu ini untuk **Admin** dan **Super Admin**

Halaman ini berisi pengaturan umum website seperti:
- Nama website
- Logo
- Social media links
- Contact information
- dll.

Ubah sesuai kebutuhan dan klik **Save**.

---

## 10. Tips Penggunaan

### Search & Filter
- Gunakan **search bar** untuk cari data dengan cepat
- Gunakan **filter dropdown** untuk menyaring data

### Pagination
- Gunakan tombol **Previous** dan **Next** di bawah tabel
- Atau klik nomor halaman langsung

### Konfirmasi Aksi
- Setiap aksi **delete** atau **publish** akan minta konfirmasi
- Pastikan sudah yakin sebelum klik **Confirm**

### Notifikasi
- Notifikasi sukses/error akan muncul di pojok kanan atas
- Hijau = berhasil
- Merah = gagal/error

### Logout
- Klik tombol **Sign Out** di bagian bawah sidebar
- Atau klik **View Website** di header untuk lihat website publik

---

## 11. Troubleshooting

### Tidak bisa login
- Cek email dan password
- Pastikan akun sudah terdaftar
- Hubungi Super Admin jika lupa password

### Tidak bisa publish artikel
- Periksa role Anda (Kontributor tidak bisa publish)
- Minta Admin/Super Admin untuk publish

### Data tidak muncul
- Refresh halaman (F5)
- Clear cache browser
- Cek koneksi internet

### Upload gambar gagal
- Cek ukuran file (maksimal 2MB recommended)
- Cek format file (PNG, JPG, JPEG)

---

**Selamat mengelola website HMJF!**
