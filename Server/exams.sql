-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2024 at 08:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exams`
--

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(60) NOT NULL,
  `nameadmin` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `goals` varchar(500) NOT NULL,
  `vision` varchar(500) NOT NULL,
  `faccbook` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `address` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`id`, `name`, `email`, `nameadmin`, `password`, `active`, `goals`, `vision`, `faccbook`, `phone`, `address`) VALUES
(1, 'ritaj', 'ritaj@99', 'fathi', '555', 1, 'hfhf', 'hfthgf', 'jhfjhf', '', 'mhhmvhv'),
(2, 'tark', 'a', 'aaa', '131', 1, '11bik', 'olhi', 'uouo', '5222', 'ujftu');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image` varchar(100) NOT NULL,
  `unit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `active`, `description`, `image`, `unit`) VALUES
(1, 'c++', 1, 'gfsgsgfs', 'nmbmnbmnb', 2),
(3, 'nodejssss', 1, 'amam9@', 'AaAaa', 131);

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `name` varchar(100) NOT NULL,
  `full_mark` int(11) NOT NULL,
  `teacherid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`id`, `start_time`, `end_time`, `name`, `full_mark`, `teacherid`) VALUES
(1, '2024-01-20 19:50:36', '2024-01-20 19:50:36', 'java', 100, 1),
(3, '2024-03-30 03:00:00', '2024-03-30 05:00:00', 'c#', 100, 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `courseid` int(11) NOT NULL,
  `teacherid` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `content` varchar(300) NOT NULL,
  `answer1` varchar(200) NOT NULL,
  `answer2` varchar(200) NOT NULL,
  `answer3` varchar(200) NOT NULL,
  `answer4` varchar(200) NOT NULL,
  `rightanswer` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `mark` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `courseid`, `teacherid`, `type`, `content`, `answer1`, `answer2`, `answer3`, `answer4`, `rightanswer`, `active`, `mark`) VALUES
(1, 1, 2, 1, 'iyriytiy', 'egrgr', '?', '?', '?', 10, 1, 40),
(6, 1, 1, 0, 'rrr', 'qqq1', 'qqq2', 'qqq3', 'qqq4', 6, 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `stady`
--

CREATE TABLE `stady` (
  `id` int(11) NOT NULL,
  `teacherid` int(11) NOT NULL,
  `coursid` int(11) NOT NULL,
  `studentid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stady`
--

INSERT INTO `stady` (`id`, `teacherid`, `coursid`, `studentid`) VALUES
(3, 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `username`, `password`, `phone`, `address`) VALUES
(1, 'ahmed', 'ytgtiy', '232', '45132123', 'ouyiuy'),
(3, 'ritaj ghar', 'ritaj_gh', '656565', '92654269', 'abusalem');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `image` varchar(100) NOT NULL,
  `specialist` varchar(100) NOT NULL,
  `lastlogin` datetime NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `username`, `password`, `image`, `specialist`, `lastlogin`, `active`) VALUES
(1, 'fathi', 'rfrrtrf', '12365', 'jgfgffj', 'mhvmvnm', '2024-01-20 19:48:36', 1),
(2, 'khaled', 'ahhh', '7272@', 'aa', '', '0000-00-00 00:00:00', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherid` (`teacherid`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherid` (`teacherid`),
  ADD KEY `courseid` (`courseid`);

--
-- Indexes for table `stady`
--
ALTER TABLE `stady`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coursid` (`coursid`),
  ADD KEY `studentid` (`studentid`),
  ADD KEY `teacherid` (`teacherid`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stady`
--
ALTER TABLE `stady`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exam`
--
ALTER TABLE `exam`
  ADD CONSTRAINT `exam_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teacher` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`courseid`) REFERENCES `course` (`id`);

--
-- Constraints for table `stady`
--
ALTER TABLE `stady`
  ADD CONSTRAINT `stady_ibfk_1` FOREIGN KEY (`coursid`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `stady_ibfk_2` FOREIGN KEY (`studentid`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `stady_ibfk_3` FOREIGN KEY (`teacherid`) REFERENCES `teacher` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
