-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2023 at 09:55 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Avatar` text NOT NULL,
  `Slug` text NOT NULL,
  `Type` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Id`, `Name`, `Avatar`, `Slug`, `Type`, `createdAt`, `updatedAt`) VALUES
(4, 'Chuyên mục ', 'http://127.0.0.1:3001/uploads/1702205588116.jpg', 'chuyen-muc-2', 1, '2023-12-06 16:26:31', '2023-12-10 10:53:16'),
(5, 'Công Nghệ Thông Tin', 'http://127.0.0.1:3001/uploads/1702205865034.jpg', 'cong-nghe-thong-tin', 2, '2023-12-10 10:57:45', '2023-12-10 10:57:45'),
(6, 'Mục mới', 'http://127.0.0.1:3001/uploads/1702219094767.jpg', 'muc-moi', 1, '2023-12-10 14:38:14', '2023-12-10 14:38:14');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `Id` int(11) NOT NULL,
  `CustomerId` int(11) NOT NULL,
  `Message` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Id` int(11) NOT NULL,
  `FullName` varchar(255) NOT NULL,
  `Phone` varchar(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `facility`
--

CREATE TABLE `facility` (
  `Id` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `Wifi` int(11) NOT NULL,
  `Washer` int(11) NOT NULL,
  `Bed` int(11) NOT NULL,
  `Gym` int(11) NOT NULL,
  `Kitchen` int(11) NOT NULL,
  `Air` int(11) NOT NULL,
  `Support` int(11) NOT NULL,
  `Storage` int(11) NOT NULL,
  `Bathroom` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `facility`
--

INSERT INTO `facility` (`Id`, `RoomId`, `Wifi`, `Washer`, `Bed`, `Gym`, `Kitchen`, `Air`, `Support`, `Storage`, `Bathroom`, `createdAt`, `updatedAt`) VALUES
(4, 6, 1, 0, 0, 1, 0, 0, 0, 1, 1, '2023-12-10 19:38:42', '2023-12-10 19:39:00');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `Id` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `Image` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `Id` int(11) NOT NULL,
  `Title` varchar(500) NOT NULL,
  `Content` text NOT NULL,
  `Avatar` text NOT NULL,
  `Tag` varchar(255) NOT NULL,
  `Slug` text NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`Id`, `Title`, `Content`, `Avatar`, `Tag`, `Slug`, `CategoryId`, `createdAt`, `updatedAt`) VALUES
(15, 'ABCD', '<p>abcd</p>\r\n', 'http://127.0.0.1:3001/uploads/1702215301746.jpg', 'apple, iphone 14, iphone', 'abcd', 6, '2023-12-10 13:35:01', '2023-12-10 14:38:29');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Id` int(11) NOT NULL,
  `Code` varchar(12) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `Start` datetime NOT NULL,
  `End` datetime NOT NULL,
  `Total` int(11) NOT NULL,
  `CustomerId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Avatar` text NOT NULL,
  `Price` int(11) NOT NULL,
  `People` int(11) NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `Slug` text NOT NULL,
  `Status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`Id`, `Name`, `Description`, `Avatar`, `Price`, `People`, `CategoryId`, `Slug`, `Status`, `createdAt`, `updatedAt`) VALUES
(6, 'Phòng 01', '<p>abcded</p>\r\n', 'http://127.0.0.1:3001/uploads/1702224488446.jpg', 1500000, 5, 5, 'cong-nghe-thong-tin', 1, '2023-12-10 16:08:08', '2023-12-10 16:08:08'),
(7, 'Phòng 02', '<p>abcded</p>\r\n', 'http://127.0.0.1:3001/uploads/1702239014204.jpg', 1500000, 5, 5, 'phong-02', 1, '2023-12-10 20:10:14', '2023-12-10 20:10:14');

-- --------------------------------------------------------

--
-- Table structure for table `rule`
--

CREATE TABLE `rule` (
  `Id` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `Rules` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rule`
--

INSERT INTO `rule` (`Id`, `RoomId`, `Rules`, `createdAt`, `updatedAt`) VALUES
(33, 6, 'aaaa', '2023-12-10 16:34:52', '2023-12-10 16:34:52'),
(34, 6, 'baaabcdes', '2023-12-10 16:34:52', '2023-12-10 16:34:52'),
(35, 6, 'cabascdw', '2023-12-10 16:34:52', '2023-12-10 16:34:52'),
(36, 6, 'd', '2023-12-10 16:34:52', '2023-12-10 16:34:52'),
(37, 6, 'ggggg', '2023-12-10 16:34:52', '2023-12-10 16:34:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CustomerId` (`CustomerId`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoomId` (`RoomId`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoomId` (`RoomId`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoomId` (`RoomId`,`CustomerId`),
  ADD KEY `CustomerId` (`CustomerId`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `rule`
--
ALTER TABLE `rule`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoomId` (`RoomId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `facility`
--
ALTER TABLE `facility`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rule`
--
ALTER TABLE `rule`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `facility`
--
ALTER TABLE `facility`
  ADD CONSTRAINT `facility_ibfk_1` FOREIGN KEY (`RoomId`) REFERENCES `rooms` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`RoomId`) REFERENCES `rooms` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`RoomId`) REFERENCES `rooms` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `rule`
--
ALTER TABLE `rule`
  ADD CONSTRAINT `rule_ibfk_1` FOREIGN KEY (`RoomId`) REFERENCES `rooms` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
