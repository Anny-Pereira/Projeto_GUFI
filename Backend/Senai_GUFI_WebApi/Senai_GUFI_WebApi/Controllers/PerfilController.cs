using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai_GUFI_WebApi.Interfaces;
using Senai_GUFI_WebApi.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Senai_GUFI_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }


        PerfilController()
        {
            _usuarioRepository = new UsuarioRepository();
        }


        [Authorize(Roles ="1,2")]
        [HttpPost("imagem/bd")]
        public IActionResult postBD(IFormFile arquivo)
        {
            try
            {
                //Anlisar tamanho do arquivo (bytes)
                if (arquivo.Length > 5000) //5MB
                {
                    return BadRequest(new { mensagem = "O tamnho máximo da imagem foi atingido!" });
                }


            //Análise da extensão do arquivo
            //Split = retorna uma matriz de caracteres
            //Last = Reupera a últim posicao da matriz
                string extensao = arquivo.FileName.Split('.').Last();

                if (extensao != "png")
                {
                    return BadRequest(new { mensagem = "Apenas arquivos .png são obrigatórios." });
                }


                //recupera id do usuario a partir do token
                int IdUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);


                _usuarioRepository.SalvarPerfilBD(arquivo, IdUsuario);

                return Ok();


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize(Roles = "1,2")]
        [HttpGet("imagem/bd")]
        public IActionResult getBD()
        {
            try
            {
                //recupera id do usuario a partir do token
                int IdUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);


                string base64 = _usuarioRepository.ConsultarPerfilBD(IdUsuario);

                return Ok(base64);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [Authorize(Roles = "1,2")]
        [HttpPost("imagem/dir")]
        public IActionResult postDir(IFormFile arquivo)
        {
            try
            {
                //Anlisar tamanho do arquivo (bytes)
                if (arquivo.Length > 5000) //5MB
                {
                    return BadRequest(new { mensagem = "O tamnho máximo da imagem foi atingido!" });
                }


                //Análise da extensão do arquivo
                //Split = retorna uma matriz de caracteres
                //Last = Reupera a últim posicao da matriz
                string extensao = arquivo.FileName.Split('.').Last();

                if (extensao != "png")
                {
                    return BadRequest(new { mensagem = "Apenas arquivos .png são obrigatórios." });
                }


                //recupera id do usuario a partir do token
                int IdUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);


                _usuarioRepository.SalvarPerfilDir(arquivo, IdUsuario);

                return Ok();


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        [Authorize(Roles = "1,2")]
        [HttpGet("imagem/dir")]
        public IActionResult getDir()
        {
            try
            {
                //recupera id do usuario a partir do token
                int IdUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);


                string base64 = _usuarioRepository.ConsultarPerfilDir(IdUsuario);

                return Ok(base64);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
