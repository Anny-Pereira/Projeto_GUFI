using Senai_GUFI_WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai_GUFI_WebApi.Interfaces
{
    /// <summary>
    /// Interface   responsável pelo PresencaRepository
    /// </summary>
    interface IPresencaRepository
    {
        /// <summary>
        /// Lista os eventos de um determinado usuario
        /// </summary>
        /// <param name="idUsuario">id do usuario que participa dos eventos listados</param>
        /// <returns>Uma lista de presenças com os dados dos eventos</returns>
        List<Presenca> ListarMinhas(int idUsuario);


        /// <summary>
        /// Cria uma nova presenca
        /// </summary>
        /// <param name="inscricao">objeto com as informações da inscrição</param>
        void Inscrever(Presenca inscricao);


        /// <summary>
        /// Altera o status de uma presenca
        /// </summary>
        /// <param name="idPresenca">id da presenca que tera sua situacao atualizada</param>
        /// <param name="status">parâmetro que atualiza a situacao para 1-Aprovada/ 2-Recusada / 3-Aguardando</param>
        void AprovarRecusar(int idPresenca, string status);
    }
}
