-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 22 nov. 2022 à 10:01
-- Version du serveur : 10.6.5-MariaDB
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bdd_sauteuhz`
--

-- --------------------------------------------------------

--
-- Structure de la table `maladie`
--

CREATE TABLE `maladie` (
  `Maladies_id` int(11) NOT NULL AUTO_INCREMENT,
  `Maladies_nom` varchar(50) NOT NULL,
  PRIMARY KEY (`Maladies_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `medecins`
--

CREATE TABLE `medecins` (
  `Medecins_id` int(11) NOT NULL AUTO_INCREMENT,
  `Medecins_numCPS` int(11) NOT NULL,
  `Medecins_nom` varchar(50) NOT NULL,
  `Medecins_prenom` varchar(50) NOT NULL,
  `Medecins_tel` int(11) NOT NULL,
  `Medecins_mail` varchar(50) NOT NULL,
  PRIMARY KEY (`Medecins_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `medicaments`
--

CREATE TABLE `medicaments` (
  `Medicaments_id` int(11) NOT NULL AUTO_INCREMENT,
  `Medicaments_nom` varchar(50) NOT NULL,
  `Medicaments_qte` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Medicaments_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `mutuelles`
--

CREATE TABLE `mutuelles` (
  `Mutuelles_id` int(11) NOT NULL AUTO_INCREMENT,
  `Mutuelles_nom` varchar(50) NOT NULL,
  `Mutuelles_tel` int(10) NOT NULL,
  `Mutuelles_mail` varchar(50) NOT NULL,
  PRIMARY KEY (`Mutuelles_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `ordonnances`
--

CREATE TABLE `ordonnances` (
  `Ordonnances_id` int(11) NOT NULL AUTO_INCREMENT,
  `idMaladies` int(11) NOT NULL,
  `idMedecins` int(11) NOT NULL,
  `idPatients` int(11) NOT NULL,
  `Ordonnances_date` date NOT NULL,
  PRIMARY KEY (`Ordonnances_id`),
  KEY `Ordonnances_ibfk_1` (`idMaladies`),
  KEY `Ordonnances_ibfk_2` (`idMedecins`),
  KEY `Ordonnances_ibfk_3` (`idPatients`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `patients_id` int(11) NOT NULL AUTO_INCREMENT,
  `idMutuelle` int(11) NOT NULL,
  `patients_secu` varchar(13) NOT NULL,
  `patients_nom` varchar(50) NOT NULL,
  `patients_prenom` varchar(50) NOT NULL,
  `patients_sexe` varchar(1) NOT NULL,
  `patients_Naissance` date NOT NULL,
  `patients_tel` int(11) NOT NULL,
  `patients_mail` varchar(50) NOT NULL,
  `patients_adresse` varchar(50) NOT NULL,
  `patients_ville` varchar(50) NOT NULL,
  `patients_cp` varchar(50) NOT NULL,
  PRIMARY KEY (`patients_id`),
  KEY `patients_ibfk_1` (`idMutuelle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `Prescriptions_id` int(11) NOT NULL AUTO_INCREMENT,
  `idOrdonnances` int(11) NOT NULL,
  `idMedicaments` int(11) NOT NULL,
  `Prescriptions_qte` int(11) NOT NULL,
  `Prescriptions_fqce` int(3) NOT NULL,
  `Prescriptions_dateFin` date NOT NULL,
  PRIMARY KEY (`Prescriptions_id`),
  KEY `Prescriptions_ibfk_1` (`idOrdonnances`),
  KEY `Prescriptions_ibfk_2` (`idMedicaments`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ordonnances`
--
ALTER TABLE `ordonnances`
  ADD CONSTRAINT `Ordonnances_ibfk_1` FOREIGN KEY (`idMaladies`) REFERENCES `maladie` (`Maladies_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Ordonnances_ibfk_2` FOREIGN KEY (`idMedecins`) REFERENCES `medecins` (`Medecins_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Ordonnances_ibfk_3` FOREIGN KEY (`idPatients`) REFERENCES `patients` (`patients_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `Patients_ibfk_1` FOREIGN KEY (`idMutuelle`) REFERENCES `mutuelles` (`Mutuelles_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `Prescriptions_ibfk_1` FOREIGN KEY (`idOrdonnances`) REFERENCES `ordonnances` (`Ordonnances_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Prescriptions_ibfk_2` FOREIGN KEY (`idMedicaments`) REFERENCES `medicaments` (`Medicaments_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
