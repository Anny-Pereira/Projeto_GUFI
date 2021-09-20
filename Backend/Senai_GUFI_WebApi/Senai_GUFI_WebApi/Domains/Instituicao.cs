using System;
using System.Collections.Generic;

#nullable disable

namespace Senai_GUFI_WebApi.Domains
{
    public partial class Instituicao
    {
        public Instituicao()
        {
            Eventos = new HashSet<Evento>();
        }

        public int IdInstituicao { get; set; }
        public string NomeInstituicao { get; set; }
        public string Cnpj { get; set; }
        public string Endereco { get; set; }

        public virtual ICollection<Evento> Eventos { get; set; }
    }
}
