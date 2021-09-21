USE GUFI;
GO

--Lista todos os tipos de usu�rio
SELECT * FROM TipoUsuario;
GO

--Lista todos os usu�rios
SELECT * FROM Usuario;
GO

--Lista todas as institui��es
SELECT * FROM Instituicao;
GO

--Lista todos os tipos de eventos
SELECT * FROM TipoEvento;
GO

--Lista todas as presen�as
SELECT * FROM Presenca;
GO

--Seleciona os dados dos eventos, da institu��o e dos tipos de eventos
SELECT Instituicao.nomeInstituicao, TipoEvento.tituloTipoEvento, Evento.nomeEvento, Evento.descricao, Evento.tipoAcesso 
FROM Evento
INNER JOIN TipoEvento 
ON Evento.idTipoEvento = TipoEvento.idTipoEvento
INNER JOIN Instituicao 
ON Evento.idInstituicao = Instituicao.idInstituicao;
GO

--Seleciona os dados dos usu�rios mostrando o tipo de usu�rio
SELECT Usuario.nomeUsuario, TipoUsuario.tituloTipoUsuario
FROM Usuario
INNER JOIN TipoUsuario
ON Usuario.IdTipoUsuario = TipoUsuario.IdTipoUsuario;
GO

--Seleciona os dados dos eventos , da institui��o, dos tipos de eventos e dos usu�rios e da situa��o da presen�a
SELECT Usuario.nomeUsuario AS [Usu�rio], TipoUsuario.tituloTipoUsuario AS [Tipo de Usu�rio], Evento.nomeEvento, Instituicao.nomeInstituicao AS [Institui��o], TipoEvento.tituloTipoEvento AS [Tipo de Evento], Situacao.descricao AS [Situa��o]
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


--Busca o usu�rio um usu�rio atrav�s de seu email e senha
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