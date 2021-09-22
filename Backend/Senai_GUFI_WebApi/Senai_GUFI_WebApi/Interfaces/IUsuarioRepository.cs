using Microsoft.AspNetCore.Http;
using Senai_GUFI_WebApi.Contexts;
using Senai_GUFI_WebApi.Domains;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Senai_GUFI_WebApi.Interfaces
{
    interface IUsuarioRepository
    {
        GufiContext ctx = new GufiContext();

        /// <summary>
        /// valida o usuário
        /// </summary>
        /// <param name="email">email do usuario</param>
        /// <param name="senha">senha do usuario</param>
        /// <returns>Objeto do tipo Usuario que foi encontrado</returns>
        Usuario Login(string email, string senha);


        //IFormFile representa um arquivo enviado com o HttpRequest
        void SalvarPerfilBD(IFormFile foto, int id_usuario)
        {
            //instancia um objeto ImagemUsuario para gravar o arquivo no BD
            ImagemUsuario imagemUsuario = new ImagemUsuario();

            using(var ms = new MemoryStream())
            {
                //copia a imagem enviada para a memória
                foto.CopyTo(ms);


                //ToArray = bytes da imagem
                imagemUsuario.Binario = ms.ToArray();


                //nome do aquivo
                imagemUsuario.NomeArquivo = foto.FileName;


                //extensão do arquivo
                imagemUsuario.MimeType = foto.FileName.Split('.').Last();


                //id do usuaio
                imagemUsuario.IdUsuario = id_usuario;
            }

            ctx.ImagemUsuarios.Add(imagemUsuario);
            ctx.SaveChanges();
        }


        void SalvarPerfilDir(IFormFile foto, int id_usuario);

        string ConsultarPerfilBD(int id_usuario);


        string ConsultarPerfilDir(int id_usuario);

    }
}
