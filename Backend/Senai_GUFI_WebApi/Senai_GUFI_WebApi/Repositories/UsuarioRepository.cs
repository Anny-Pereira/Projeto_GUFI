using Senai_GUFI_WebApi.Contexts;
using Senai_GUFI_WebApi.Domains;
using Senai_GUFI_WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai_GUFI_WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        GufiContext ctx = new GufiContext();

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u=> u.Email == email && u.Senha == senha);
        }
    }
}
