CREATE TABLE `berita` (
	`id` int AUTO_INCREMENT NOT NULL,
	`judul` varchar(255) NOT NULL,
	`ringkasan` varchar(500) NOT NULL,
	`konten` text NOT NULL,
	`kategori` enum('kegiatan','pengumuman','artikel') NOT NULL DEFAULT 'kegiatan',
	`gambar_url` varchar(500),
	`status` enum('draf','terbit') NOT NULL DEFAULT 'draf',
	`penulis_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `berita_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pengguna` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(255) NOT NULL,
	`username` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`peran` enum('admin','pengurus','anggota') NOT NULL DEFAULT 'anggota',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pengguna_id` PRIMARY KEY(`id`),
	CONSTRAINT `pengguna_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `pinjam_gedung` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama_pemohon` varchar(255) NOT NULL,
	`organisasi` varchar(255) NOT NULL,
	`no_hp` varchar(20) NOT NULL,
	`email` varchar(255),
	`keperluan` varchar(500) NOT NULL,
	`keterangan` text,
	`tanggal_mulai` date NOT NULL,
	`tanggal_selesai` date NOT NULL,
	`status` enum('menunggu','disetujui','ditolak') NOT NULL DEFAULT 'menunggu',
	`catatan_admin` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pinjam_gedung_id` PRIMARY KEY(`id`)
);
