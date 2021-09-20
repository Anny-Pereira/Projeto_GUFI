using System;
using System.Collections.Generic;

#nullable disable

namespace Senai_GUFI_WebApi.Domains
{
    public partial class Evento
    {
        public Evento()
        {
            Presencas = new HashSet<Presenca>();
        }

        public int IdEvento { get; set; }
        public int? IdTipoEvento { get; set; }
        public int? IdInstituicao { get; set; }
        public string NomeEvento { get; set; }
        public DateTime DataEvento { get; set; }
        public string Descricao { get; set; }
        public bool? TipoAcesso { get; set; }

        public virtual Instituicao IdInstituicaoNavigation { get; set; }
        public virtual TipoEvento IdTipoEventoNavigation { get; set; }
        public virtual ICollection<Presenca> Presencas { get; set; }
    }
}
