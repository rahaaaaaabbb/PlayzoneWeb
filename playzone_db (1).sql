-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Jul 2026 pada 10.50
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playzone_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `reservasi`
--

CREATE TABLE `reservasi` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `unitId` int(11) NOT NULL,
  `waktu_mulai` datetime(3) NOT NULL,
  `waktu_selesai` datetime(3) NOT NULL,
  `total_harga` int(11) NOT NULL,
  `status` enum('PENDING','DIBAYAR','SELESAI','BATAL') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `reservasiId` int(11) NOT NULL,
  `order_id` varchar(191) NOT NULL,
  `metode_bayar` varchar(191) DEFAULT NULL,
  `status_bayar` varchar(191) NOT NULL DEFAULT 'pending',
  `waktu_bayar` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `unitps`
--

CREATE TABLE `unitps` (
  `id` int(11) NOT NULL,
  `nama_unit` varchar(191) NOT NULL,
  `status` enum('TERSEDIA','DISEWA','MAINTENANCE') NOT NULL DEFAULT 'TERSEDIA',
  `harga_jam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `unitps`
--

INSERT INTO `unitps` (`id`, `nama_unit`, `status`, `harga_jam`) VALUES
(1, 'PS5 - Layar 1', 'TERSEDIA', 15000),
(2, 'PS5 - Layar 2', 'DISEWA', 15000),
(3, 'PS4 - Layar 3', 'TERSEDIA', 10000),
(4, 'PS4 - Layar 4', 'TERSEDIA', 10000),
(5, 'PS4 - Layar 5', 'TERSEDIA', 10000),
(6, 'PS4 - Layar 6', 'TERSEDIA', 10000),
(7, 'PS4 - Layar 7', 'TERSEDIA', 10000),
(8, 'PS3 - Layar 8', 'DISEWA', 5000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('PELANGGAN','ADMIN','OWNER') NOT NULL DEFAULT 'PELANGGAN',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `nama`, `email`, `password`, `role`, `createdAt`) VALUES
(1, 'Pelanggan Guest', 'guest@playzone.com', '123', 'PELANGGAN', '2026-06-26 08:29:41.527'),
(2, 'Zidan', 'zidan@gmail.com', '123', 'ADMIN', '2026-06-26 08:55:08.450'),
(3, 'rahab', 'rahab@gmail.com', '123', 'PELANGGAN', '2026-06-26 08:56:10.412'),
(5, 'Pelanggan Walk-In', 'walkin@playzone.internal', 'NO_PASSWORD_REQUIRED', 'PELANGGAN', '2026-07-06 07:17:13.490'),
(6, 'Ahmad (Walk-In)', 'walkin-1783322233492@playzone.internal', 'CASH_TRANSACTION', 'PELANGGAN', '2026-07-06 07:17:13.493');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `reservasi`
--
ALTER TABLE `reservasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Reservasi_userId_fkey` (`userId`),
  ADD KEY `Reservasi_unitId_fkey` (`unitId`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Transaksi_reservasiId_key` (`reservasiId`),
  ADD UNIQUE KEY `Transaksi_order_id_key` (`order_id`);

--
-- Indeks untuk tabel `unitps`
--
ALTER TABLE `unitps`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `reservasi`
--
ALTER TABLE `reservasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `unitps`
--
ALTER TABLE `unitps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `reservasi`
--
ALTER TABLE `reservasi`
  ADD CONSTRAINT `Reservasi_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unitps` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Reservasi_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `Transaksi_reservasiId_fkey` FOREIGN KEY (`reservasiId`) REFERENCES `reservasi` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
