using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai_GUFI_WebApi.Domains;
using Senai_GUFI_WebApi.Interfaces;
using Senai_GUFI_WebApi.Repositories;
using Senai_GUFI_WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Senai_GUFI_WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }



        /// <summary>
        /// Valida o usuário
        /// </summary>
        /// <param name="login">objeto login que contém o email e a senha do usuario</param>
        /// <returns>retorna um token com as informações do usuario</returns>
        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuario usuariobuscado = _usuarioRepository.Login(login.Email, login.Senha);

                if (usuariobuscado == null)
                {
                    return BadRequest("E-mail ou senha inválidos!");
                }

                //Caso o usuário seja encontrado, prossegue com a criação do token
                var minhasClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuariobuscado.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuariobuscado.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, usuariobuscado.IdTipoUsuario.ToString())
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("gufi-chave-autenticacao"));


                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var meuToken = new JwtSecurityToken(
                    issuer: "gufi.WebAPI",
                    audience:"gufi.WebAPI",
                    claims: minhasClaims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                return Ok(new {
                    token = new JwtSecurityTokenHandler().WriteToken(meuToken)
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

    }
}
