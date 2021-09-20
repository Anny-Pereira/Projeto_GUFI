using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Senai_GUFI_WebApi.ViewModels
{
    /// <summary>
    /// Classe responsável pelo modelo de Login
    /// </summary>
    public class LoginViewModel
    {
        //Mensagem de erro para Login
        [Required(ErrorMessage ="Informe o e-mail do usuário!")]
        public String Email { get; set; }

        [Required(ErrorMessage ="Informe a senha do usuário!")]
        public string Senha { get; set; }
    }
}
