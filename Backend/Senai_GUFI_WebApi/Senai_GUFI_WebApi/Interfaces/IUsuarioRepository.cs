using Senai_GUFI_WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai_GUFI_WebApi.Interfaces
{
    interface IUsuarioRepository
    {
        /// <summary>
        /// valida o usuário
        /// </summary>
        /// <param name="email">email do usuario</param>
        /// <param name="senha">senha do usuario</param>
        /// <returns>Objeto do tipo Usuario que foi encontrado</returns>
        Usuario Login(string email, string senha);


       

    }
}
