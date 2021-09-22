using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Senai_GUFI_WebApi.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Presencas = new HashSet<Presenca>();
        }

        public int IdUsuario { get; set; }
        public int? IdTipoUsuario { get; set; }
        public string NomeUsuario { get; set; }

        //Mensagem de erro para cadastro
        [Required(ErrorMessage = "O e-mail é obrigatório!")]
        public string Email { get; set; }



        [Required(ErrorMessage = "A senha é obrigatória!")]
        [StringLength(10, MinimumLength = 3, ErrorMessage = "A senha deve conter de 3 a 10 caracteres!")]
        public string Senha { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        public virtual ImagemUsuario ImagemUsuario { get; set; }
        public virtual ICollection<Presenca> Presencas { get; set; }
    }
}
