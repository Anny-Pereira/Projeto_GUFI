using Microsoft.AspNetCore.Http;
using Senai_GUFI_WebApi.Contexts;
using Senai_GUFI_WebApi.Domains;
using Senai_GUFI_WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Senai_GUFI_WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        GufiContext ctx = new GufiContext();

        public string ConsultarPerfilBD(int id_usuario)
        {
            ImagemUsuario imagemUsuario = new ImagemUsuario();

            imagemUsuario = ctx.ImagemUsuarios.FirstOrDefault(i => i.IdUsuario == id_usuario);

            if (imagemUsuario != null)
            {
                //Converte o valor de um matrix de inteiros (array de binarios) em string.
                return Convert.ToBase64String(imagemUsuario.Binario);
            }
        }

        public string ConsultarPerfilDir(int id_usuario)
        {
            throw new NotImplementedException();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u=> u.Email == email && u.Senha == senha);
        }

        public void SalvarPerfilBD(IFormFile foto, int id_usuario)
        {
            throw new NotImplementedException();
        }

        public void SalvarPerfilDir(IFormFile foto, int id_usuario)
        {
            string nome_novo = id_usuario.ToString() + ".png";


            using (var strem = new FileStream(Path.Combine("perfil", nome_novo), FileMode.Create))
            {
                foto.CopyTo(strem);
            }
        }
    }
}
