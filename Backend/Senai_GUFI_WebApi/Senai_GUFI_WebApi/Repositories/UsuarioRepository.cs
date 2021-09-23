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

            return null;
        }

        public string ConsultarPerfilDir(int id_usuario)
        {
            string nome_novo = id_usuario.ToString() + ".png";

            string caminho = Path.Combine("Perfil", nome_novo);


            if (File.Exists(caminho))
            {
                byte[] bytesArquivo = File.ReadAllBytes(caminho);

                return Convert.ToBase64String(bytesArquivo);
            }

            return null;
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u=> u.Email == email && u.Senha == senha);
        }

        public void SalvarPerfilBD(IFormFile foto, int id_usuario)
        {
            //instancia um objeto ImagemUsuario para gravar o arquivo no BD
            ImagemUsuario imagemUsuario = new ImagemUsuario();

            using (var ms = new MemoryStream())
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

            //ANALISAR SE O USUÁRIO JÁ POSSUI FOTO DE PERFIL
            ImagemUsuario fotoExistente = new ImagemUsuario();

            fotoExistente = ctx.ImagemUsuarios.FirstOrDefault(i=> i.IdUsuario == id_usuario);


            if (fotoExistente != null)
            {
                fotoExistente.Binario = imagemUsuario.Binario;
                fotoExistente.NomeArquivo = imagemUsuario.NomeArquivo;
                fotoExistente.MimeType = imagemUsuario.MimeType;
                fotoExistente.IdUsuario = id_usuario;

                //Atualiza a imagem de perfil do usuário
                ctx.ImagemUsuarios.Update(fotoExistente);
            }

            else
            {
                ctx.ImagemUsuarios.Add(imagemUsuario);
            }


            //Salva as modificações
            ctx.SaveChanges();
        }

        public void SalvarPerfilDir(IFormFile foto, int id_usuario)
        {

            //Define o nome do arquivo com o id do usuario + .png
            string nome_novo = id_usuario.ToString() + ".png";


            //FileStream fornece uma exibição para uma sequencia de bytes
            //Suporte pra leitura e gravação
            using (var strem = new FileStream(Path.Combine("Perfil", nome_novo), FileMode.Create))
            {
                
                //Copia todos os elementos (array de bytes) para o caminho identificado 
                foto.CopyTo(strem);
            }
        }
    }
}
