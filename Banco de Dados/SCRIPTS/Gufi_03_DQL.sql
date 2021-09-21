USE GUFI;
GO

--Lista todos os tipos de usuário
SELECT * FROM TipoUsuario;
GO

--Lista todos os usuários
SELECT * FROM Usuario;
GO

--Lista todas as instituições
SELECT * FROM Instituicao;
GO

--Lista todos os tipos de eventos
SELECT * FROM TipoEvento;
GO

--Lista todas as presenças
SELECT * FROM Presenca;
GO

--Seleciona os dados dos eventos, da institução e dos tipos de eventos
SELECT Instituicao.nomeInstituicao, TipoEvento.tituloTipoEvento, Evento.nomeEvento, Evento.descricao, Evento.tipoAcesso 
FROM Evento
INNER JOIN TipoEvento 
ON Evento.idTipoEvento = TipoEvento.idTipoEvento
INNER JOIN Instituicao 
ON Evento.idInstituicao = Instituicao.idInstituicao;
GO

--Seleciona os dados dos usuários mostrando o tipo de usuário
SELECT Usuario.nomeUsuario, TipoUsuario.tituloTipoUsuario
FROM Usuario
INNER JOIN TipoUsuario
ON Usuario.IdTipoUsuario = TipoUsuario.IdTipoUsuario;
GO

--Seleciona os dados dos eventos , da instituição, dos tipos de eventos e dos usuários e da situação da presença
SELECT Usuario.nomeUsuario AS [Usuário], TipoUsuario.tituloTipoUsuario AS [Tipo de Usuário], Evento.nomeEvento, Instituicao.nomeInstituicao AS [Instituição], TipoEvento.tituloTipoEvento AS [Tipo de Evento], Situacao.descricao AS [Situação]
FROM Usuario
INNER JOIN Presenca
ON Usuario.idUsuario = Presenca.IdUsuario
INNER JOIN Evento
ON Evento.idEvento = Presenca.idEvento
INNER JOIN Instituicao
On Evento.idInstituicao = Instituicao.idInstituicao
INNER JOIN TipoEvento 
ON TipoEvento.IdTipoEvento = Evento.idTipoEvento
INNER JOIN Situacao
ON Situacao.idSituacao = Presenca.idSituacao
INNER JOIN TipoUsuario
ON TipoUsuario.IdTipoUsuario = Usuario.idTipoUsuario;
GO


--Busca o usuário um usuário através de seu email e senha
--WHERE
SELECT Usuario.nomeUsuario, TipoUsuario.tituloTipoUsuario, Usuario.email, Usuario.senha
FROM Usuario
JOIN TipoUsuario
ON Usuario.idTipoUsuario = TipoUsuario.idTipoUsuario
WHERE email = 'lucas@gmail'
AND senha = '111';
GO

SELECT * FROM Evento

SELECT * FROM Presenca WHERE idUsuario = 2