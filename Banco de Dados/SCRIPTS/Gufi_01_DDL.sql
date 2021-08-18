CREATE DATABASE GUFI;
GO

USE GUFI;
GO

CREATE TABLE TipoUsuario(
idTipoUsuario INT PRIMARY KEY IDENTITY (1,1),
tituloTipoUsuario VARCHAR(30) UNIQUE NOT NULL
);
GO


CREATE TABLE TipoEvento (
idTipoEvento INT PRIMARY KEY IDENTITY (1,1),
tituloTipoEvento VARCHAR(50) UNIQUE NOT NULL
);
GO


CREATE TABLE Instituicao(
idInstituicao INT PRIMARY KEY IDENTITY (1,1),
nomeInstituicao VARCHAR(100) UNIQUE NOT NULL,
cnpj CHAR(14),
endereco VARCHAR(250) UNIQUE NOT NULL
);
GO

CREATE TABLE Situacao(
idSituacao INT PRIMARY KEY IDENTITY (1,1),
descricao VARCHAR(50)
);
GO



CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY IDENTITY (1,1),
idTipoUsuario INT FOREIGN KEY REFERENCES TipoUsuario(idTipoUsuario),
nomeUsuario VARCHAR(50) NOT NULL,
email VARCHAR(200) UNIQUE NOT NULL,
senha VARCHAR(10) NOT NULL
);
GO

CREATE TABLE Evento(
idEvento INT PRIMARY KEY IDENTITY (1,1),
idTipoEvento INT FOREIGN KEY REFERENCES TipoEvento(idTipoEvento),
idInstituicao INT FOREIGN KEY REFERENCES Instituicao(idInstituicao),
nomeEvento VARCHAR(100) NOT NULL,
dataEvento DATETIME NOT NULL,
descricao VARCHAR(500) NOT NULL,
tipoAcesso BIT DEFAULT (1),
);
GO

CREATE TABLE Presenca(
idPresenca INT PRIMARY KEY IDENTITY (1,1),
idUsuario INT FOREIGN KEY REFERENCES Usuario(idUsuario),
idEvento INT FOREIGN KEY REFERENCES Evento(idEvento),
idSituacao INT FOREIGN KEY REFERENCES Situacao(idSituacao) DEFAULT (3)
);
GO
