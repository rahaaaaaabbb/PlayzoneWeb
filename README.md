Fitur Utama Aplikasi:Manajemen Pengguna (User Management): Aplikasi ini memiliki sistem autentikasi yang membedakan hak akses berdasarkan peran (role), yaitu PELANGGAN (termasuk guest dan walk-in), ADMIN, dan OWNER.   
Manajemen Unit PS: Mengelola daftar konsol yang disewakan (seperti PS3, PS4, dan PS5), mengatur harga sewa per jam yang berbeda untuk setiap unit, serta memantau status operasionalnya (TERSEDIA, DISEWA, MAINTENANCE).   
Sistem Reservasi (Booking): Mencatat jadwal penyewaan pelanggan yang mencakup ID pengguna, ID unit PS, waktu mulai, waktu selesai, dan kalkulasi total harga. Reservasi ini dilengkapi pelacakan status seperti PENDING, DIBAYAR, SELESAI, atau BATAL.  
Pencatatan Transaksi: Memproses pembayaran dengan mencatat ID Pesanan (order_id), metode pembayaran, waktu pembayaran, dan memperbarui status bayar.  

Prisma ORM (Object-Relational Mapping)
Ini adalah lapisan penghubung (bridge) antara kode aplikasi dan database.
Fungsi Prisma agar bisa berinteraksi dengan database menggunakan kode TypeScript/JavaScript.
Prisma membuat pengelolaan data jauh lebih cepat, rapi, dan mencegah banyak bug.

2. Backend Framework (Sistem Server & API)
Karena menggunakan Prisma, backend aplikasi berjalan di ekosistem Node.js.


Next.js :
Dengan Next.js, developer bisa membangun antarmuka web (frontend) dan sistem API (backend) sekaligus dalam satu proyek yang sama. 
Kombinasi Next.js dan Prisma adalah standar industri modern saat ini.

Express.js atau NestJS: Jika aplikasi ini memisahkan antara frontend dan backend (API terpisah), maka Express.js (sangat ringan) atau NestJS (sangat terstruktur untuk TypeScript) digunakan untuk mengelola logika bisnis seperti menghitung tarif sewa dan memproses pembayaran.

3. Frontend Framework (Antarmuka Pengguna)
Untuk membangun tampilan layar yang akan digunakan oleh kasir, admin, atau pelanggan

React.js: antarmuka menggunakan React.
React sangat ideal untuk membuat dashboard manajemen yang interaktif,
misalnya untuk melihat status ketersediaan unit (Tersedia/Disewa) yang bisa berubah sewaktu-waktu.

Tailwind CSS:framework UI ini digunakan bersama React/Next.js untuk mendesain tombol, tabel, dan warna pada aplikasi secara cepat.

4. Database

MySQL / MariaDB: Digunakan sebagai tempat penyimpanan data fisik untuk seluruh tabel (User, Unit_PS, Reservasi, Transaksi).

Ringkasan Alur Kerja Aplikasi (Arsitektur):
Ketika pelanggan atau kasir menekan tombol "Buat Reservasi" di layar (Frontend ), permintaan tersebut dikirim ke server (Backend). 
Server kemudian menyuruh Prisma ORM untuk mencatat pesanan tersebut.
Prisma akan menerjemahkan perintah itu ke dalam bahasa SQL dan menyimpannya secara permanen ke dalam Database (MySQL).
