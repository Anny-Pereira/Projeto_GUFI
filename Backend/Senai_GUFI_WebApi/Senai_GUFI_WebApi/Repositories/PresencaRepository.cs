using Microsoft.EntityFrameworkCore;
using Senai_GUFI_WebApi.Contexts;
using Senai_GUFI_WebApi.Domains;
using Senai_GUFI_WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai_GUFI_WebApi.Repositories
{
    /// <summary>
    /// Repository responsável pelas presencas
    /// </summary>
    public class PresencaRepository : IPresencaRepository
    {

        /// <summary>
        /// Objeto de contexto por onde serão chamados os métodos FrameworkCore
        /// </summary>
        GufiContext ctx = new GufiContext();

        public void AprovarRecusar(int idPresenca, string status)
        {
            Presenca presencaBuscada = ctx.Presencas
                 .FirstOrDefault(p => p.IdPresenca == idPresenca);

            switch (status)
            {
                case "1":
                    presencaBuscada.IdSituacao = 1;
                    break;

                case "2":
                    presencaBuscada.IdSituacao = 2;
                    break;

                case "3":
                    presencaBuscada.IdSituacao = 3;
                    break;

                default:
                    presencaBuscada.IdSituacao = presencaBuscada.IdSituacao;
                    break;
            }

            ctx.Presencas.Update(presencaBuscada);

            ctx.SaveChanges();
        }

        public void Inscrever(Presenca inscricao)
        {
            //inscricao.IdSituacao = 3;

            ctx.Presencas.Add(inscricao);

            ctx.SaveChanges();
        }

        public List<Presenca> ListarMinhas(int idUsuario)
        {
            //Retorna uma lista com todas as informações das presenças
            //Estabelece como parametro de consulta o id do usuario recebido --- Lista de eventos de um unico usuario
            return ctx.Presencas
                .Include(p=> p.IdUsuarioNavigation)
                .Include(p=> p.IdEventoNavigation.IdTipoEventoNavigation) 
                .Include(p=> p.IdEventoNavigation.IdInstituicaoNavigation)
                .Include("IdSituacaoNavigation")
                .Where(p => p.IdUsuario == idUsuario).ToList();
        }
    }
}
