USE GUFI;
GO

INSERT INTO TipoUsuario (tituloTipoUsuario)
VALUES ('Administrador'), ('Comum');
GO

INSERT INTO Instituicao(nomeInstituicao, cnpj, endereco)
VALUES ('Escola SENAI de Informática', '99999999999999', 'Al. Barão de Limeira, 539');
GO

INSERT INTO TipoEvento (tituloTipoEvento)
VALUES ('C#'), ('ReactJS'), ('SQL');
GO

INSERT INTO Situacao(descricao)
VALUES ('Aprovada'), ('Recusada'), ('Aguardando');
GO

INSERT INTO Usuario (idTipoUsuario, nomeUsuario, email, senha)
VALUES (1, 'Lucas', 'lucas@gmail', '111'), (2, 'Saulo', 'saulo@gmail', '333'), (2, 'Bianca', 'bianca@gmail', '555');
GO

INSERT INTO Evento( idTipoEvento, idInstituicao, nomeEvento, dataEvento, descricao, tipoAcesso)
VALUES (1, 1, 'Orientação a Objetos', '18-08-2021 14:00', 'Conceitos de pilares da pogramação orientada a objetos', 1), (2, 1, 'Ciclo de Vida', '20-08-2012 20:00', 'Como utilizar  os ciclos de vida com a biblioteca REACTJS', 0); 
GO

INSERT INTO Presenca(idUsuario, idEvento, idSituacao)
VALUES (3, 1, 2), (2, 2, 1);
GO